"use client"
import React, { useEffect } from 'react'
import Wrapper from '../components/Wrapper'
import { SquarePlus } from 'lucide-react'
import { toast } from 'react-toastify'
import { addUserToProject, getProjectsAssociatedWithUser } from '../action'
import { useUser } from '@clerk/nextjs'
import { Project } from '@/type'
import ProjectComponent from '../components/ProjectComponent'
import EmptyState from '../components/EmptyState'

const page = () => {
  const { user } = useUser()//récupérer l'utilisateur connecté
  const email = user?.emailAddresses[0]?.emailAddress as string//récupérer l'email de l'utilisateur connecté
  const [inviteCode, setInviteCode] = React.useState('')//par défaut ''
  const [associatedProjects, setAssociatedProjects] = React.useState<Project[]>([])//récupérer les projets associés à l'utilisateur connecté
  const fetchProjects = async (email: string) => {

    try {
      const associated = await getProjectsAssociatedWithUser(email)//récupérer les projets associés à l'utilisateur connecté
      setAssociatedProjects(associated)//mettre à jour les projets associés
    } catch (error) {
      toast.error("Erreur lors du chargement des projets")
    }

  }

  useEffect(() => {
    if (email) {
      fetchProjects(email)//récupérer les projets associés à l'utilisateur connecté
    }
  }, [email])//récupérer les projets associés à l'utilisateur connecté

  const handleSubmit = async () => {
    try {
      if (inviteCode != "") {

        await addUserToProject(email, inviteCode)//ajouter l'utilisateur au projet
        fetchProjects(email)
        setInviteCode("")//mettre à jour le code d'invitation
        toast.success("Vous avez été ajouté au projet avec succès")
      } else {
        toast.error("Il manque le code du projet")
      }
    } catch (error) {
      toast.error("Code invalide ou vous appartenez déjà à ce projet")
    }
  }
  return (
    <Wrapper>
      <div className='flex'>
        <div className='mb-4'>
          <input
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            type="text"
            placeholder="Code d'invitation"
            className='w-full p-2 input input-bordered '
          />

        </div>
        <button className='btn btn-primary ml-4' onClick={handleSubmit}>
          Rejoindre <SquarePlus className='w-4' />
        </button>
      </div>
      <div>
        {
          associatedProjects.length > 0 ? (
            <ul className="w-full grid md:grid-cols-3 gap-6">
              {associatedProjects.map((project) => (
                <li key={project.id}>
                  <ProjectComponent project={project} admin={0} style={true} ></ProjectComponent>
                </li>
              ))}
            </ul>

          ) : (
            <div>
              <EmptyState imageSrc={"/empty-project.png"}
                imageAlt={"Picture of an empty project"}
                message={"Aucun projet associéy"} />
            </div>
          )

        }
      </div>
    </Wrapper>
  )
}

export default page