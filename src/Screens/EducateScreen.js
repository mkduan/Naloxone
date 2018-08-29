import React from 'react';
import { Text, View, StyleSheet, ScrollView, Dimensions, Linking } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import {Video} from 'expo';

let { width, height } = Dimensions.get('window');

const SECTIONS = [
  {
    title: 'Signs and Symptons of an Opioid Overdose',
    content: 'Recongnize the signs and symptons of an overdose, including:\n\n\t·Difficulty\n\t\t·walking\n\t\t·talking\n\t\t·staying awake\n\t·Blue lips or nails\n\t·Very small pupils\n\t·Cold and clammy skin\n\t·Dizziness and confusion\n\t·Extreme drowsiness\n\t·Choking, gurgling or snoring sounds\n\t·Slow, weak or no breathing\n\t·Inability to wake up, even when shaken or shouted at',
    link: null,
  },
  {
    title: 'What to do: Save a Life',
    content: 'Drug overdoses often happen with others around. Staying at the scene is important to help save the life of the person experiencing an overdose.\n\nWitnesses should:\n\n\t·call for emergency help\n\t·be prepared by carrying naloxone to use if you suspect an opioid overdose\n\t·provide first aid, including rescue breathing (CPR), if necessary, until emergency help arrives\n\t·stay calm and reassure the person that help is on the way\n\nTell others about the new Good Samaritan Drug Overdose Act.',
    link: null,
  },
  {
    title: 'Good Samaritan Drug Overdose Act',
    content: 'The Good Samaritan Drug Overdose Act provides some legal protection for people who experience or witness an overdose and call 9-1-1 for help.\n\nThe act can protect you from:\n\n\t·harges for possession of a controlled substance (i.e. drugs) under section 4(1) of the Controlled Drugs and Substances Act\n\t·Breach of conditions regarding simple possession of controlled substances (i.e. drugs) in:\n\t\t·pre-trial release\n\t\t·probation orders\n\t\t·conditional sentences\n\t\t·parole \n\nThe Good Samaritan Drug Overdose Act applies to anyone seeking emergency support during an overdose, including the person experiencing an overdose. The act protects the person who seeks help, whether they stay or leave from the overdose scene before help arrives. The act also protects anyone else who is at the scene when help arrives.',
    link: 'https://www.canada.ca/en/health-canada/services/substance-use/problematic-prescription-drug-use/opioids/about-good-samaritan-drug-overdose-act.html',
  },
  {
    title: 'How to Administer Naloxone',
    content: null,
    link: null,
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
      <View style={styles.content}>
        <Text>{section.content}</Text>
        <Text>
          To find out more click
          <Text style={{color: 'blue'}}
            onPress={() => Linking.openURL(section.link)}>
             here.
          </Text>
        </Text>
      </View>
    }  else {
      //TODO: if there are more videos then have to sperate ref and video by index
      console.log("Video opening...");
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
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20
  },
  header: {
    backgroundColor: '#90bcff',
    padding: 10
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
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
