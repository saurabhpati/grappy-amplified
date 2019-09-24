import React, { useState } from 'react';
import Amplify from 'aws-amplify';
import { ChatBot, AmplifyTheme } from 'aws-amplify-react';
import awsconfig from './aws-exports';
import { GrappyBot } from './GrappyBot';

Amplify.configure(awsconfig);

// Imported default theme can be customized by overloading attributes
const myTheme = {
  ...AmplifyTheme,
  sectionHeader: {
    ...AmplifyTheme.sectionHeader,
    backgroundColor: '#ff6600'
  }
};

const BotType = {
  None: "None",
  Flower: "Flower",
  Grappy: "Grappy",
}

export const Bot = () => {
  const [selectedBot, setSelectedBot] = useState(BotType.None);

  const handleComplete = (err, confirmation) => {
    if (err) {
      alert('Bot conversation failed')
      return;
    }

    alert('Success: ' + JSON.stringify(confirmation, null, 2));
    return 'Trip booked. Thank you! what would you like to do next?';
  }

  const resetButton = <div onClick={() => setSelectedBot(BotType.None)}>Reset</div>

  switch (selectedBot) {
    case BotType.Flower:
      return (
        <>
          <div className="App">
            <header className="App-header">
              <h1 className="App-title">Welcome to ChatBot Demo</h1>
            </header>
            <ChatBot
              userInput="I want to pick up some flowers"
              title="My Bot"
              theme={myTheme}
              botName="OrderFlowers_dev"
              welcomeMessage="Welcome, how can I help you today?"
              onComplete={handleComplete}
              clearOnComplete={true}
              voiceEnabled={true}
              textEnabled={true}
              conversationModeOn={true}
            />
          </div>
          {resetButton}
        </>
      );

    case BotType.Grappy:
      return <><GrappyBot />{resetButton}</>;

    default:
      return (<div>
        <button onClick={() => setSelectedBot(BotType.Flower)}>Flower Bot</button>
        <button onClick={() => setSelectedBot(BotType.Grappy)}>Grappy Bot</button>
      </div>);
  }
}
