import './FluidGlass.css';

const FluidGlass = ({ items = [], className = '' }) => {
    return (
        <nav className={`fluid-glass-nav ${className}`}>
            <div className="fluid-glass-container">
                {items.map((item, index) => (
                    <a
                        key={index}
                        href={item.href || '#'}
                        className="fluid-glass-item"
                    >
                        {item.label}
                    </a>
                ))}
            </div>
        </nav>
    );
};

export default FluidGlass;
