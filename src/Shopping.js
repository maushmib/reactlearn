const products=[
    {title:'cabage',isfruit:false,id:1},
    {title:'garlic',isfruit:false,id:2},
    {title:'apple',isfruit:true,id:3},    
]

export default function Shopping(){
    const listi=products.map(product=>
        <li key={product.id} style={{color:product.isfruit?'magenta':'darkgreen'}}>{product.title}</li>
    )
    return(
        <ul>{listi}</ul>
    );
}