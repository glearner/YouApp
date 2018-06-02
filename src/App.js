import React, { Component } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import Search from './Search/Search';
import './App.css';
import Thumbnail from './Thumbnails/Thumbnails';


class App extends Component {

  constructor(props) {
    super(props);
    this.state ={
      videosID : [],
      thumbnail : [],
      term : 'god of war',
      currentlyPlaying: 'oUMRwOAa-BY',
      currentlyPlayingTitle : 'God oF War',
      titles : []
    }
  }
 

onChangeHandler = (event)=>{
      let term = '';
      term = event.target.value;
      this.setState({term :term});
  
}

componentDidMount(){
  this.onClickHandler();
}

onVideoClick=(index)=>{
        const video = this.state.videosID[index]
        const title = this.state.titles[index]
        this.setState({currentlyPlaying:video,currentlyPlayingTitle : title,term : title});
        this.onClickHandler();
}

onClickHandler=()=>{
        const API_KEY ='AIzaSyD5W5awgnpGhRtiuQdWZnhVHFFHxMyn2GM';
        const rootUrl = `https://www.googleapis.com/youtube/v3/search?part=id,snippet&maxResults=15&q=${this.state.term}&key=${API_KEY}`;
        axios.get(rootUrl).then(
          (video)=>{
            let videos = [];  
            let thumbnails = [];
            let currentlyPlayings = '';
            let count = 0;
            let titles = [];
            video.data.items.map((v)=>{
              if(v.id['kind']==="youtube#video" && count<=5)
              {
                  videos.push(v.id['videoId']);
                  thumbnails.push(v.snippet);
                  titles.push(v.snippet.title)
                  count++;
              } 
           return true;
        })
        
        currentlyPlayings = videos[0]; //Store info for current playing video

        //Setting state for clicked vidow
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
          <div className="App text-center">
                <Search 
                    change={this.onChangeHandler} 
                    click = {this.onClickHandler}
                  />
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
                            return  <Thumbnail 
                            src={thumbnails.thumbnails.default['url']}
                            clicked = {()=>this.onVideoClick(index)}
                            thumbnailed = {()=>this.onVideoClick(index)}
                            title = {thumbnails.title.length > 25 ?thumbnails.title.slice(0,25)+'....': thumbnails.title}
                            />
                         })
                    }
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
