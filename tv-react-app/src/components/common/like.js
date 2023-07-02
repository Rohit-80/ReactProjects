
const Like = (props)=>{
      
        let classes = "fa fa-heart";
        if(!props.like){
            classes += '-o';
        }
        return (
            <>  <i onClick={props.onClick} style={{cursor:'pointer'}} className ={classes}></i> </>
        );
    
}

export default Like;