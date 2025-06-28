import React from 'react';

import { DocumentView, RNPdftron } from 'react-native-pdftron';
import { SafeAreaView } from 'react-native-safe-area-context';

const PdftronScreen = ({ navigation, route }) => {
  const _viewerRef = React.useRef(null);
  React.useEffect(() => {
    RNPdftron.initialize('Insert commercial license key here after purchase');
    RNPdftron.enableJavaScript(false);
    RNPdftron.getVersion().then(version => {
      console.log('PDFTron version:', version);
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DocumentView
        ref={_viewerRef}
        source={route.params?.path}
        showLeadingNavButton={true}
        saveStateEnabled={false}
        onLeadingNavButtonPressed={() => {
          navigation.goBack();
        }}
        onDocumentLoaded={path => {
          console.log('The document has finished loading:', path);
        }}
        onAnnotationChanged={({ action, annotations }) => {
          console.log('Annotation edit action is', action);
          annotations.forEach(annotation => {
            console.log('The id of changed annotation is', annotation.id);
            console.log('It is in page', annotation.pageNumber);
            console.log('Its type is', annotation.type);
          });
        }}
      />
    </SafeAreaView>
  );
};

export default PdftronScreen;
