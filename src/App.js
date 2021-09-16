import React from "react";
import axios from "axios";


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

  async getChannelDetails() {
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
    await axios
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
    const { channelsDetails: channels } = this.state
    return (
      < div style={{ margin: '0 auto', width: '80%' }}>
        <header className="w3-container w3-food-grape" style={{ marginTop: 10 }}>

          <h1 style={{ textAlign: 'center' }}>TWITCH STREAMERS</h1>
        </header>
        <div className="w3-container">
          {
            channels.map(channel => (
              <div key={channel.id} style={{ marginTop: 10 }} >
                <ul className="w3-ul w3-card-4">
                  <li className="w3-bar">
                    <div className="w3-bar-item" style={{ width: '10%', marginRight: 15 }} >
                      <img
                        src={channel.profile_image_url} className="w3-circle w3-hide-small" style={{ width: '85px' }} />
                    </div>
                    <div className="w3-bar-item" style={{ width: '70%' }}>
                      <span className="w3-large">
                        {channel.display_name}
                      </span><br />
                      <span >
                        {channel.status == "online"
                          ? <p>{`${channel.game_name}  ${channel.title}`}</p>
                          : 'Offline'
                        }
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            ))
          }
        </div>
      </div >
    )
  }
}


export default App;
