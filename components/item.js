import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

class Item extends React.Component {
    state = {};
    MEMORIZED_BORDER_COLOR = '#ffc34d'

    render() {
        return (
            <TouchableOpacity onPress={()=>{this.props.onClickItem(this.props.data.name,
                    this.props.data.borderColor==this.MEMORIZED_BORDER_COLOR?0:1)}}>
                <View style={{...styles.item, borderColor:this.props.data.borderColor}}>
                    <View>
                        <Text style={styles.heading}>{this.props.data.name}</Text>
                        <Text style={styles.description}>{this.props.data.noPages}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    item:{
        padding:15,
        paddingRight:7,
        borderRadius:10,
        marginTop:-0.2,
        marginBottom:13,
        borderWidth:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    heading:{
        fontSize:20,
        color:"#ffc34d",
        fontWeight:'600',
    },
    description:{
        fontSize:12,
        color:"white",
        textAlign:'center'
    },
});

export default Item;