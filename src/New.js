import React,{ Component } from 'react';

class App extends Component{
    state={
        articles:[],
        page:0,
        searchTerm:' ',
        isLoading:false,
    };

    componentDidMount(){
        this.fetchArticles();
    }

    fetchArticles=()=>{
        const {page,searchTerm} =this.state;
        this.setState({isLoading:true});



    fetch('http://hn.algolia.com/api/v1/search?query=${searchTerm}&page=${page}')
    .then(res=>res.json())
    .then(data=>
        this.setState(prev=>({
            articles:[...prev.articles,...data.hits],
            isLoading:false,
        }))
    )
    .catch(error=>{
        console.error("Error");
        this.setState({isLoading:false});
    });
    };
    loadMore=()=>{
        this.setState(
            prev=>({page:prev.page+1}),
            this.fetchArticles);
        
    };

    render(){
        const {articles,isLoading}=this.state;
        return(
            <div>
            <input type="text" onChange={this.handleSearch} placeholder="Search..."/>
            
                {isLoading && <p>Loading</p>}
                <ul>
                    {articles.map(a=>(
                        <li key={a.objectID}>{a.title}</li>
                    ))}
                </ul> 
                <button onClick={this.loadMore}>Load More</button>
                </div>
            
                );
    }
} 
export default App;