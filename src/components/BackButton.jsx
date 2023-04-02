import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function BackButton() {
  const navigate = useNavigate();
  return (
    <button className="btn " onClick={() => navigate(-1)}>
      <FaArrowCircleLeft /> Back
    </button>
  );
}

export default BackButton;
