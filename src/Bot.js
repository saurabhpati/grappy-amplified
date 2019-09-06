import React from 'react';
import Amplify from 'aws-amplify';
import { ChatBot, AmplifyTheme } from 'aws-amplify-react';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

// Imported default theme can be customized by overloading attributes
const myTheme = {
  ...AmplifyTheme,
  sectionHeader: {
    ...AmplifyTheme.sectionHeader,
    backgroundColor: '#ff6600'
  }
};

export const Bot = () => {

  const handleComplete = (err, confirmation) => {
    if (err) {
      alert('Bot conversation failed')
      return;
    }

    alert('Success: ' + JSON.stringify(confirmation, null, 2));
    return 'Trip booked. Thank you! what would you like to do next?';
  }

  return (
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
  );
}
