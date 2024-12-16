import './ExploreContainer.css';

interface ContainerProps {
    name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({name}) => {
    return (
        <div className="container_">
            <strong>{name}</strong>
            <p>Fuente: <a target="_blank" rel="noopener noreferrer"
                          href="https://fakeapi.platzi.com/en/about/introduction/">Docs</a></p>
        </div>
    );
};

export default ExploreContainer;
