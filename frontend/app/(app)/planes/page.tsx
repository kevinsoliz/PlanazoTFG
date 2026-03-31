import { CiSearch } from "react-icons/ci";
import { FaBell} from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

const Planes = () => {
  return (
    <section>
      <div className="flex justify-between p-5 gap-5">
        
          <label className="input rounded-full">
            <CiSearch className="text-neutral/40" />
            <input type="text" placeholder="Buscar" />
          </label>
          
        
        <div className="flex items-center gap-6">
          <FaBell size={20} className="text-primary cursor-pointer"/>
          <FaMessage size={20} className="text-primary cursor-pointer"/>
          <button className="btn btn-primary btn-outline">Crear plan</button>
        </div>
      </div>
    </section>
  );
};

export default Planes;
