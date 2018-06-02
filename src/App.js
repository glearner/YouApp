import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import YouTube from 'react-youtube';


class App extends Component {

  constructor(props) {
    super(props);
    this.state ={
      videosID : [],
      thumbnail : [],
      term : 'Javascript',
      currentlyPlaying: 'fX2W3nNjJIo',
      currentlyPlayingTitle : 'This is the Deafault Video',
      titles : []
    }
  }
 

onChangeHandler = (event)=>{
  let term = '';
  term = event.target.value;
  this.setState({term :term});

  // console.log(this.state.term);
  
}

onVideoClick=(index)=>{
  const video = this.state.videosID[index]
  const title = this.state.titles[index]
  this.setState({currentlyPlaying:video,currentlyPlayingTitle : title,term : title});
  
  this.onClickHandler();

  
  
  // console.log(video);
}

onClickHandler=()=>{
  const API_KEY ='AIzaSyD5W5awgnpGhRtiuQdWZnhVHFFHxMyn2GM';
    const rootUrl = `https://www.googleapis.com/youtube/v3/search?part=id,snippet&maxResults=15&q=${this.state.term}&key=${API_KEY}`;

    // console.log(rootUrl);

    axios.get(rootUrl).then(
      (video)=>{
        // console.log(video);
        let videos = [];  
        let thumbnails = [];
        let currentlyPlayings = '';
        let count = 0;
        let titles = [];
        video.data.items.map((v)=>{
          if(v.id['kind']==="youtube#video" && count<=5)
          {videos.push(v.id['videoId']);
          // console.log(count);
    
          thumbnails.push(v.snippet);
          titles.push(v.snippet.title)
          count++;

         
        } 
          return true;
        })
        currentlyPlayings = videos[0];
        // console.log(thumbnails[0].thumbnails.default['url']);
        this.setState({videosID:videos, titles : titles,thumbnail:thumbnails,currentlyPlaying:currentlyPlayings})
      }
    ).catch((error)=>{
      console.log(error)
    })
    
}


render(){
 
  const opts = {
    height: '450',
    width: '100%',
    playerVars: { 
      autoplay: 0
    }
  };


 
    return (
      <div>

          {/* {console.log(this.state.videosID[0])} 
         */}
          <div className="App" style={{margin:10}}>
          <input type="text" 
          placeholder="   Search Video Here"
           style={{margin:10,width:'40%'}}  
           onChange={this.onChangeHandler}/>
          <button type="button" className="btn btn-success" onClick={this.onClickHandler}>Search</button>
          </div>
          
          <br/>
          <div className="container">
            <div className="row">
          <div className="col-md-8 ">
          <YouTube
            videoId={this.state.currentlyPlaying}
            opts={opts}
            onReady={this._onReady}
          />
            <br/>
            <h5>{this.state.currentlyPlayingTitle}</h5>
          </div>
          <div className="col-md-4  col-sm-4">
          {this.state.thumbnail.map((thumbnails,index)=>{
              // console.log(thumbnails);
              return <div className="row thumbnail" style={{marginTop:15}}> 
                        <div className="col-md-6">
                      <img 
                      src={thumbnails.thumbnails.default['url']} 
                      width="80%" height="100px" alt="..." 
                      onClick = {()=>this.onVideoClick(index)}
                      className="img-responsive"/>
                      </div>
                      <div className="col-md-6">
                      <p
                       onClick={()=>this.onVideoClick(index)}>{thumbnails.title.length > 25 ?thumbnails.title.slice(0,25)+'....': thumbnails.title}</p>
                      </div>
                      <hr/>
                  </div>
              
          })}
          </div>
            </div>
         
            </div>
      </div>  
    );
  }
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}

export default App;
