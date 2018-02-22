import { connect } from 'react-redux';
import Comments from './Comments'

     
function mapStoreToProps(store){
    console.log('Store',store)
    return{
        comment:store.comment.comment
    };
}

export default connect(mapStoreToProps)(Comments);
