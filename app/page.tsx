"use client";
import Image from "next/image";
import Wrapper from "./components/Wrapper";
import React, { useEffect, useState } from "react";
import { FolderGit2 } from "lucide-react";
import { createProject, deleteProjectById, getProjectCreateByUser } from "./action";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
import { Project } from "@/type";
import ProjectComponent from "./components/ProjectComponent";
import EmptyState from "./components/EmptyState";

export default function Home() {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress as string;
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async (email: string) => { // Permet de rafraichir la page 
    try {
      const myprojects = await getProjectCreateByUser(email);
      setProjects(myprojects);
      console.log(myprojects);

    } catch (error) {
      console.error('Erreur lors du chargement des projets:', error);

    }

  }
  useEffect(() => {
    if (email) {
      fetchProjects(email);
    }
  }, [email])
  const deleteProject = async (projectId: string) => {
    try {
      await deleteProjectById(projectId); // on appelle la fonction de suppresion
      fetchProjects(email); // on recharge les projets
      toast.success("Projet supprimé avec succès");
    } catch (error) {
      console.error("Error deleting project:", error);

    }
  }
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      const modal = document.getElementById('my_modal_3') as HTMLDialogElement;
      const project = await createProject(name, description, email);
      if (modal) {
        modal.close();
      }
      setName(""),
        setDescription("")
      fetchProjects(email);
      toast.success("Projet créé avec succès")
    } catch (error) {
      console.error("Error creating project:", error);
    }
  }

  return (
    <Wrapper>
      <div>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button className="btn mb-6 btn-primary" onClick={() => (document.getElementById('my_modal_3') as HTMLDialogElement).showModal()}>Nouveau Projet <FolderGit2 /></button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className="font-bold text-lg">Nouveau Projet</h3>
            <p className="py-4">Description votre projet simplement grâce à la description </p>
            <div> <input
              placeholder="Nom du projet"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-base-300 input  input-bordered w-full mb-4 placeholder:text-sm"
              required
            />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mb-2 textarea textarea-bordered border border-base-300 w-full  textarea-md placeholder::text-sm"
                required
              ></textarea>
              <button className="btn btn-primary" onClick={handleSubmit}>
                Nouveau Projet <FolderGit2 />
              </button>
            </div>
          </div>
        </dialog>

        <div className='w-full'>
          {
            projects.length > 0 ? (
              <ul className="w-full grid md:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <li key={project.id}><ProjectComponent project={project} admin={1} style={true} onDelete={deleteProject}></ProjectComponent>
                  </li>
                ))}
              </ul>

            ) : (
              <div>
                <EmptyState imageSrc={"/empty-project.png"} 
                imageAlt={"Picture of an empty project"} 
                message={"Aucun projet crée"}/>
              </div>
            )

          }
        </div>
      </div>
    </Wrapper>
  );
}
function async(toString: () => string) {
  throw new Error("Function not implemented.");
}

