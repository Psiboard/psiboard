/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@chakra-ui/react";
import { useAuth } from "../hooks/auth";

export default function ModalEdit({isOpen, onClose}:any) {
  const {availableSchedules} = useAuth();
  if(isOpen){
     return (
       <div className="fixed inset-0 z-[9] bg-[rgb(0,0,0,0.3)] ">
         <div className="fixed -translate-x-2/4 -translate-y-2/4 w-[450px] bg-[#fff] rounded-2xl left-2/4 top-2/4">
           <div className="bg-[#02969c] text-[#fff] flex justify-between p-8 rounded-[16px_16px_0_0]">
             <h2>Editar Horário</h2>
             <button onClick={onClose}>
               <svg
                 xmlns="http://www.w3.org/2000/svg"
                 fill="none"
                 viewBox="0 0 24 24"
                 strokeWidth={1.5}
                 stroke="currentColor"
                 className="w-6 h-6"
               >
                 <path
                   strokeLinecap="round"
                   strokeLinejoin="round"
                   d="M6 18 18 6M6 6l12 12"
                 />
               </svg>
             </button>
           </div>

           <div className="px-8 py-4">
             <p className="text-2xl mb-[0.8rem];">Daniel - 07:00h</p>

             <div className="flex justify-between items-center mb-6">
               <label htmlFor="">Indique uma nova data</label>
               <input
                 type="date"
                 className="border w-2/5 p-[0.3rem] rounded-[10px] border-solid"
               />
             </div>

             <div className="flex justify-between items-center mb-6">
               <label htmlFor="">Horários disponiveis</label>
               <select
                 name=""
                 id=""
                 className="border w-2/5 p-[0.3rem] rounded-[10px] border-solid"
               >
                 {availableSchedules
                   ? availableSchedules.map((hora: any, index: any) => {
                       return (
                         <option value={hora} key={index}>
                           {hora}
                         </option>
                       );
                     })
                   : null}
               </select>
             </div>

             <div className="flex justify-between items-center mb-6">
               <label htmlFor="">Marque o campo de remarcação</label>
               <input
                 type="checkbox"
                 id="remarcacao"
                 name="remarcacao"
                 value="remarcação"
               />
             </div>
           </div>
           <div className=" flex justify-between pt-0 pb-8 px-8">
             <Button colorScheme="red" size="sm" onClick={onClose}>
               Cancelar
             </Button>
             <Button colorScheme="teal" size="sm">
               Editar
             </Button>
           </div>
         </div>
       </div>
     );
  }
  else return null;
}
