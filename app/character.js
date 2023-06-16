import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text} from 'react-native';
import styles from '../common.style.js';
import { useSearchParams } from 'expo-router';
import { getCharacterData } from './character_util.js';

export default function Character() {
    const { filename } = useSearchParams();
    const [data, setData] = useState(null);

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

    if (data === null || Object.keys(data).length === 0) {
    return (
        <View style={styles.container}>
        <Text style={styles.header}>{formatFilename(filename)}</Text>
        <Text style={styles.key}>Under Construction</Text>
        </View>
    );
    }    
      
    return (
        <ScrollView style={styles.scrollview}>
            <View style={styles.container}>
            {data && (
            <>
                <Text style={styles.header}>{formatFilename(filename)}</Text>
                {Object.entries(data).map(([key, value]) => (
                <View key={key} style={styles.item}>
                    <Text style={styles.key}>{formatFieldName(key)}</Text>
                    {renderValue(value)}
                </View>
                ))}
            </>
            )}
        </View>
      </ScrollView>
    );
}