/* eslint-disable @typescript-eslint/no-explicit-any */
export default function ModalEdit({isOpen, onClose}:any) {
  const schedules = [
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
  ];
  if(isOpen){
     return (
       <div>
         <div>
           <div>
             <h2>Editar Horário</h2>
             <button>Editar</button>
           </div>
           <div>
             <p>Daniel - 07:00h</p>

             <div>
               <label htmlFor="">Indique uma nova data</label>
               <input type="date" />
             </div>

             <div>
               <label htmlFor="">Horários disponiveis</label>
               <select name="" id="">
                 {schedules
                   ? schedules.map((hora: any, index: any) => {
                       return (
                         <option value={hora} key={index}>
                           {hora}
                         </option>
                       );
                     })
                   : null}
               </select>
             </div>

             <div className="">
               <label htmlFor="">Marque o campo de remarcação</label>
               <input
                 type="checkbox"
                 id="remarcacao"
                 name="remarcacao"
                 value="remarcação"
               />
             </div>
           </div>
           <div>
             <button onClick={onClose}>Cancelar</button>
             <button>Editar</button>
           </div>
         </div>
       </div>
     );
  }
  else return null;
}
