import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  to?: string;
  label?: string;
}

const BackButton = ({ to, label = 'Back' }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center text-slate-600 hover:text-slate-900 font-medium"
    >
      <ArrowLeft className="h-4 w-4 mr-1" />
      {label}
    </button>
  );
};

export default BackButton;