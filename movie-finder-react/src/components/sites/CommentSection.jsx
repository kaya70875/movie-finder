import React, {useState } from 'react'
import './CommentSection.css'
import useFetch from '../../hooks/useFetch'

export default function CommentSection({id}) {

    const comments = useFetch(`/movie/${id}/reviews?language=en-US&`)
    const results = comments?.results || [];

    const [expand , setExpand] = useState(false);

    function handleClick(index){
        const commentsDiv = document.getElementById(`comment-${index}`)
        commentsDiv.classList.toggle('active');

        if(commentsDiv.classList.contains('active')) {
            setExpand(true);
        }else{
            setExpand(false);
        }
    }

  return (
    <div className="container__comments">
        <header>See Comments</header>
        <div className="wrap__containers">
        {results.length !== 0 ? results.map((result  ,index) => (
             <div className="comments__wrap" id={`comment-${index}`} key={index}>
             <div className="comments__top">
                 { result.author_details.avatar_path !== null && <img src={`https://image.tmdb.org/t/p/original${result.author_details.avatar_path.toString()}`} style={{width : '64px' , height : '64px' , borderRadius : '20px'}} />}
                 <h2 className="user-name">{result.author}</h2>
                 <p className="published-date" style={{fontSize : '14px' , fontWeight : '300' , textAlign : 'center'}}>Published at {new Date(result.created_at).toLocaleDateString()}</p>
                 {result.author_details.rating ? <p className="rating" style={{color : 'red'}}>{result.author_details.rating} of 10</p> : 'No Rating'}
             </div>
             <div className="comments__comment" key={result.id}>
                 <p>{result.content.replaceAll('</em>','')
                    .replaceAll('<em>' , '')}</p>
             </div>
             {result.content.length > 400 && <p className="see-more" onClick={() => handleClick(index)}>{expand ? 'collapse' : 'see more'}</p>}
             
         </div>
         
        )) : <p className='no-comment'>No Comments Available</p>}
        </div>
        
    </div>
  )
}
