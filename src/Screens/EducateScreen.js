import React from 'react';
import { Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import {Video} from 'expo';

let { width, height } = Dimensions.get('window');

const SECTIONS = [
  {
    title: 'Save a Life',
    content: 'Drug overdoses often happen with others around. Staying at the scene is important to help save the life of the person experiencing an overdose.\n\nWitnesses should:\n\n· call for emergency help\n· be prepared by carrying naloxone to use if you suspect an opioid overdose\n· provide first aid, including rescue breathing (CPR), if necessary, until emergency help arrives\n· stay calm and reassure the person that help is on the way\n\nTell others about the new Good Samaritan Drug Overdose Act.'
  },
  {
    title: 'Good Samaritan Drug Overdose Act',
    content: 'The Good Samaritan Drug Overdose Act provides some legal protection for people who experience or witness an overdose and call 9-1-1 for help.\n\nThe act can protect you from:\n\n· Charges for possession of a controlled substance (i.e. drugs) under section 4(1) of the Controlled Drugs and Substances Act\n· Breach of conditions regarding simple possession of controlled substances (i.e. drugs) in:\n\t· pre-trial release\n\t· probation orders\n\t· conditional sentences\n\t· parole \n\nThe Good Samaritan Drug Overdose Act applies to anyone seeking emergency support during an overdose, including the person experiencing an overdose. The act protects the person who seeks help, whether they stay or leave from the overdose scene before help arrives. The act also protects anyone else who is at the scene when help arrives.'
  },
  {
    title: 'How to Administer Naloxone',
    content: null,
  },
];

const naloxoneHowTo = null;

export default class HandleNotificationScreen extends React.Component {

  _toggleVideo(index) {
    console.log("On change Index value: " + index);
    //TODO: Pauses when already paused, not a problem but eh
    if (index !== 2 && naloxoneHowTo !== null) {
      console.log('Pausing the Video');
      naloxoneHowTo.setStatusAsync({ shouldPlay: false });
    }
  }

  _renderSectionTitle(section) {
    return (
      null
    );
  }

  _renderHeader(section) {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  }

  _renderContent(section) {
    if (section.content !== null) {
      return (
        <View style={styles.content}>
          <Text>{section.content}</Text>
        </View>
      );
    } else {
      //TODO: if there are more videos then have to sperate ref and video by index
      return (
        <Video
          source={require('../Videos/How-To-Use-Naloxone.mp4')}
          ref = { component => {
            //Only need the video reference once when the screen loads up
            if (component !== null && naloxoneHowTo === null) {
              naloxoneHowTo = component;
            }
          }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="contain"
          shouldPlay = {false}
          isLooping = {false}
          style={{ width: width, height: width*(width/height)}}
          useNativeControls
        />
      );
    }
  }

  render() {

      return (
          <View style={{ flex: 1}}>
            <View style = {{ height: 75, backgroundColor: '#1f5fa5', justifyContent: 'flex-end'}}>
              <Text style= {{left: 20, bottom: 10, color: 'white', fontSize: 30}}>
                Educate
              </Text>
            </View>
            <Text style = {{ fontSize: 20, textAlign: 'center', margin: 10, }}>
              Educate yourself on what you can do to help prevent opioid overdose.
            </Text>
            <ScrollView>
              <Accordion
                sections={SECTIONS}
                renderSectionTitle={this._renderSectionTitle}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
                onChange = {this._toggleVideo}
            />
            </ScrollView>
          </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20
  },
  header: {
    backgroundColor: '#d6f1fc',
    padding: 10
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500'
  },
  content: {
    padding: 20,
    backgroundColor: '#fff'
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)'
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)'
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10
  },
  activeSelector: {
    fontWeight: 'bold'
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10
  }
});