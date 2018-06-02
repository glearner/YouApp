import React , {Component} from 'react';
import YouTube from 'react-youtube';


class Search extends Component{
render(){
    const opts = {
        height: '390',
        width: '640',
        playerVars: { 
          autoplay: 0
        }
      };

      return(
          <div>
              {console.log("It works")}
        <YouTube
        videoId={this.state.videosID[0]}
        opts={opts}
      /></div>
      )
} 
}
export default Search;
