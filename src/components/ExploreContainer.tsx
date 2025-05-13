import { useState } from 'react';
import './ExploreContainer.css';
import { useFullscreen } from '../hooks/fullscreen';
import { IonButton } from '@ionic/react';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  const [fullscreenElement, setFullscreenElement] = useState<HTMLDivElement|null>(null);

  const { isFullscreen, requestFullscreen, exitFullscreen} = useFullscreen(fullscreenElement);

  return (
    <div ref={setFullscreenElement} className="container">
      <strong>{name}</strong>
      <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
      <IonButton onClick={isFullscreen ? exitFullscreen : requestFullscreen}>{isFullscreen && "Exit"} Fullscreen</IonButton>
    </div>
  );
};

export default ExploreContainer;
