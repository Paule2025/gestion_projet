"use client";
import Image from "next/image";
import Wrapper from "./components/Wrapper";
import React from "react";
import { FolderGit2 } from "lucide-react";
import { createProject } from "./action";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";

export default function Home() {
  const {user} = useUser();
  const email = user?.primaryEmailAddress?.emailAddress as string;
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    try{
        const modal = document.getElementById('my_modal_3') as HTMLDialogElement;
        const project = await createProject(name, description,email);
        if(modal){
          modal.close();
        }
        setName(""),
        setDescription("")
        toast.success("Projet créé avec succès")
    } catch (error) {
      console.error("Error creating project:", error);
    }}

  return (
    <Wrapper>
      <div>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button className="btn" onClick={() => (document.getElementById('my_modal_3') as HTMLDialogElement).showModal()}>open modal</button>
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
      </div>
    </Wrapper>
  );
}
