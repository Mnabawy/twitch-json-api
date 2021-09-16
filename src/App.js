import React from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import { useDemoData } from '@mui/x-data-grid-generator';
import { DataGrid } from '@mui/x-data-grid';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';



import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: [
        "ESL_SC2",
        "OgamingSC2",
        "cretetion",
        "freecodecamp",
        "storbeck",
        "habathcx",
        "RobotCaleb",
        "noobs2ninjas",
      ],
      channelsDetails: [],
    };
  }

  componentDidMount() {
    this.getChannelDetails();
    this.getStreamDetails();
  }

  async getStreamDetails() {
    const url = "https://api.twitch.tv/helix/streams/";
    const config = {
      headers: {
        "Authorization": "Bearer w3d9qo30x7yiyob3kq4vtu1xovuaxs",
        "Client-Id": "8r3cnqtyyefyq0lhhethv2tpwzoe0m",
      },
      params: {
        user_login: this.state.channels.map(channel => channel),
      },
    };
    await axios
      .get(url, config)
      .then(response => {
        let res = response.data.data
        let channels = this.state.channelsDetails

        const test = channels.forEach((channel) => {
          let arr = res.map((stream) => {
            if (channel.id === stream.user_id) {
              channel['status'] = 'online';
              channel['title'] = stream.title;
              channel['game_name'] = stream.game_name
            }
          })
        })

        this.setState({ channelsDetails: channels });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getChannelDetails() {
    const url = "https://api.twitch.tv/helix/users/";
    const config = {
      headers: {
        Authorization: "Bearer w3d9qo30x7yiyob3kq4vtu1xovuaxs",
        "Client-Id": "8r3cnqtyyefyq0lhhethv2tpwzoe0m",
      },
      params: {
        login: this.state.channels.map(channel => channel),
      },
    };
    axios
      .get(url, config)
      .then(response => {
        const list = [...response.data.data];
        this.setState({ channelsDetails: list })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    console.log('channel details', this.state.channelsDetails)

    const { channelsDetails: channels } = this.state
    return (
      < div >
        <h1>TWITCH STREAMERS</h1>
        {
          channels.map(channel => (
            <div key={channel.id}>
              <li><img src={channel.profile_image_url}></img></li>
              <li>{channel.display_name}</li>
              {channel.status == "online"
                ? <p>{`${channel.game_name}  ${channel.title}`}</p>
                : 'Offline'
              }
            </div>
          ))
        }
        <ul>
        </ul>
      </div >
    )
  }
}


export default App;
