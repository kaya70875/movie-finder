import { toast } from "sonner";
import { useWatchList } from "../../context/WatchListContext";

interface MovieButtonProps {
  id: number;
  button: string;
  buttonType: string;
}

export default function MovieButton({ id, button, buttonType } : MovieButtonProps) {
  const { watchList, addMovie, deleteMovie, buttonLabels } = useWatchList()!;

  const isInWatchList = watchList.includes(id);

  
  const handleWatch = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (isInWatchList) {
      deleteMovie(id);
      toast.success('Movie removed from watchlist.');
    } else {
      addMovie(id);
      toast.success('Movie successfully added to your watchlist.');
    }
  };

  const defaultBigButtonLabel = isInWatchList ? 'Remove from Watch List' : 'Add to Watch List';
  const defaultEllipseButtonSVG = isInWatchList ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 24 24" fill="#F8312F" stroke="#F8312F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
    </svg>
  );

  const buttonLabel = buttonLabels[id]?.[buttonType] || (buttonType === 'bigButton' ? defaultBigButtonLabel : defaultEllipseButtonSVG);

  return (
    <button className={button} onClick={handleWatch}>
      {buttonLabel}
    </button>
  );
}