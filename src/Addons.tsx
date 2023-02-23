
export interface Addon {
    id: number;
    title: string;
    text: string;
    price: number;
    checked: boolean;
}

const Addons: React.FC<any> = ({isMonthly, checkedAddons, setChekedAddons}) => {
    
    const checkboxHandler = (addon: Addon) => {
        
        const filteredArr = checkedAddons.filter((item: Addon) => item.id !== addon.id)
        const res = [...filteredArr, {...addon, checked: !addon.checked}].sort((a,b) => a.id - b.id)
        setChekedAddons(res)
    }
    console.log(checkedAddons)
    return (
        <div className='container-addons'>
            {checkedAddons.map((addon: Addon) => (
                <label key={addon.title} className={addon.checked ? 'active': ''}>
                    <input type="checkbox" name={addon.title}  checked={addon.checked} onChange={() => checkboxHandler(addon)} />
                    <h2>{addon.title}</h2>
                    <p>{addon.text}</p>
                    <span>{isMonthly ? `+${addon.price}$/mo`: `+${addon.price*10}$/yr`}</span>
                </label>
            ))}
        </div>
    )
}

export default Addons