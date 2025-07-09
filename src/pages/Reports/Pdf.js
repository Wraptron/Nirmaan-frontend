import React from "react";
import {
    Document, 
    Page,
    Text,
    View,
    StyleSheet,
} from '@react-pdf/renderer';
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
    },
    section :{
        flexGrow: 1,
    },
});

const Pdf = () => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>Team Name:</Text>
                </View>
                <View style={styles.section}>
                    <Text>Stage</Text>
                </View>
            </Page>
            <Page>
                <View>
                    <Text>sfh</Text>
                </View>
                <View>
                    <Text>sfh</Text>
                </View>
            </Page>
        </Document>
    )
    
}

export default Pdf;