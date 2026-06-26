const fs = require('fs');
const path = require('path');
const rnComponents = ['View', 'StyleSheet', 'ScrollView', 'TouchableOpacity', 'TextInput', 'Modal', 'Alert', 'Switch', 'FlatList', 'ActivityIndicator', 'Pressable', 'Animated'];

function fix(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) fix(fullPath);
    else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes("import {  } from 'react-native';")) {
        const needed = rnComponents.filter(c => new RegExp('\\b' + c + '\\b').test(content));
        content = content.replace("import {  } from 'react-native';", "import { " + needed.join(', ') + " } from 'react-native';");
        fs.writeFileSync(fullPath, content);
        console.log('Fixed', fullPath);
      }
    }
  });
}
fix('./src');
