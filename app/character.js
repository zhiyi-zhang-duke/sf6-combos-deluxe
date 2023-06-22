import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import styles from '../common.style.js';
import { useSearchParams } from 'expo-router';
import { getCharacterData } from './character_util.js';
import { ButtonGroup } from '@rneui/themed'

export default function Character() {
    const { filename } = useSearchParams();
    const [data, setData] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [showCombos, setShowCombos] = useState(true);
    const [showWiki, setShowWiki] = useState(false);
    const [showVideos, setShowVideos] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          const characterData = await getCharacterData(filename);
          setData(characterData);
        };
    
        fetchData();
      }, [filename]);

    function formatFilename(filename) {
        // Strip the ".json" extension
        const baseName = filename.replace('.json', '');
      
        // Custom transformations for specific filenames
        if (baseName === 'e_honda') {
          return 'E. Honda';
        }
      
        // Capitalize the first letter
        const capitalized = baseName.charAt(0).toUpperCase() + baseName.slice(1);
      
        return capitalized;
      }

    function formatFieldName(fieldName) {
        const regex = /([A-Z])/g;
        const formatted = fieldName.replace(regex, ' $1');
        const capitalized = formatted.charAt(0).toUpperCase() + formatted.slice(1);
        
        return capitalized;
    }  

    function renderValue(value) {
        if (Array.isArray(value) && value.every((item) => typeof item === 'string')) {
          return value.map((item, index) => (
            <Text key={index} style={styles.value}>
              {item}
            </Text>
          ));
        }
      
        return <Text style={styles.value}>{value}</Text>;
    }

    function renderVideoValue(value) {
      if (Array.isArray(value) && value.every((item) => typeof item === 'string')) {
        return value.map((item, index) => (
          <WebView
            key={index}
            style={{ marginTop: 20, width: 320, height: 230 }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{ uri: item }}
          />
        ));
      }
    }

    function renderCharacterMenu() {
      // The onpress code here is not ideal. 
      // TODO: make it less hardcoded
      return (
        <ButtonGroup
          buttons={['Combos', 'Wiki', 'Videos']}
          selectedIndex={selectedIndex}
          onPress={(value) => {
            setSelectedIndex(value);
            if (value == 0) {
              setShowCombos(true);
              setShowWiki(false);
              setShowVideos(false);
            }
            else if (value == 1) {
              setShowWiki(true);
              setShowCombos(false);
              setShowVideos(false);
            }
            else if (value == 2) {
              setShowVideos(true);
              setShowCombos(false);
              setShowWiki(false);
            }
          }}
          containerStyle={{ marginBottom: 20 }}
          selectedButtonStyle={{ backgroundColor: "black" }}
        />
      )
    }

    if (data === null || Object.keys(data).length === 0) {
    return (
        <View style={styles.container}>
        <Text style={styles.header}>{formatFilename(filename)}</Text>
        <Text style={styles.key}>Under Construction</Text>
        </View>
    );
    }    

    const { width } = Dimensions.get('window');
      
    return (
      <ScrollView style={styles.scrollview}>
        <View style={styles.container}>
          <Text style={styles.header}>{formatFilename(filename)}</Text>
          {renderCharacterMenu()}
          {showCombos && data && (
            <>
              
              {Object.entries(data).map(([key, value]) => {
                if (key === "videos") {
                  return null; // Skip rendering videos property
                }
    
                return (
                  <View key={key} style={styles.item}>
                    <Text style={styles.key}>{formatFieldName(key)}</Text>
                    {renderValue(value)}
                  </View>
                );
              })}
            </>
          )}
          {showWiki && data && (
            <>
              <View>
                <Text style={styles.key}>Under Construction</Text>
              </View>
            </>
          )}
          {/* Instead of this let's try a video player instead */}
          {/* Url: https://www.npmjs.com/package/react-native-video-player */}
          {showVideos && data && (
            <>
              {data.videos.map((video, index) => (
                <WebView
                  key={index}
                  style={{ marginTop: 20, width: width, height: 230 }}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  source={{ uri: video }}
                />
              ))}
            </>
          )}              
        </View>
      </ScrollView>
    );    
}