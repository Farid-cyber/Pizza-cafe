import { FiAlignJustify } from "react-icons/fi";
type InitialProps = {
  handleToggle: (val: boolean) => void;
};
const HeaderAdmin = ({ handleToggle }: InitialProps) => {
  return (
    <div className="w-100 p-3 d-flex justify-content-between align-items-center border-b">
      <div className="d-flex align-items-center! w-100 py-2 gap-2">
        <FiAlignJustify
          onClick={() => handleToggle(true)}
          className="text-primary"
          size={35}
        />
        <h3 className="text-primary mt-1"> Admin</h3>
      </div>
    </div>
  );
};

export default HeaderAdmin;
