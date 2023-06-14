import React from 'react';
import {Link, useSearchParams} from 'expo-router';
import { ScrollView, Text} from 'react-native';
import styles from '../common.style.js';

export default function Index() {
    const filenames = [
        'blanka.json',
        'cammy.json',
        'chun-li.json',
        'deejay.json',
        'dhasim.json',
        'e_honda.json',
        'guile.json',
        'jamie.json',
        'jp.json',
        'juri.json',
        'ken.json',
        'kimberly.json',
        'lily.json',
        'luke.json',
        'manon.json',
        'marisa.json',
        'ryu.json',
        'zangief.json',
      ];

    // Sort filenames alphabetically
    filenames.sort();      

    return (
        <ScrollView style={styles.container}>
            {filenames.map((filename) => (
            <Link 
                key={filename}
                style={styles.button}
                href={{ pathname: '/character', params: { filename } }}
                asChild
            >
                <Text style={styles.buttonText}>{formatFilename(filename)}</Text>
            </Link>
            ))}
      </ScrollView>
    );
}

function formatFilename(filename) {
    const baseName = filename.replace('.json', '');
    const capitalized = baseName
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  
    return capitalized;
  }