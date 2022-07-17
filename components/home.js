import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, FlatList, BackHandler} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import Icon2 from 'react-native-vector-icons/AntDesign';

import Item from './item.js';

class Home extends React.Component {
    constructor(){
        super()

        this.state = {notes:[], selectedId:-1, headerLeft:'Notes', headerRight:'plus'};
        this.renderBody.bind(this);
        
        this.initDB();
        this.updateList();
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            ()=>{
                if(this.state.selectedId!=-1){
                    this.setState({selectedId:-1, headerLeft:'Notes', headerRight:'plus'});
                    this.updateList()
                    return true;
                }
            }
        );
    }

    db = SQLite.openDatabase({name: 'Notes', location:'default'}, ()=>{}, error=>(console.log(error)));

    initDB = async () => {
        this.db.transaction(async (tx) => {
            await tx.executeSql('CREATE TABLE IF NOT EXISTS Notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT)');
        })
    }

    addData = async (title, description) => {
        this.db.transaction(async (tx) => {
            await tx.executeSql('INSERT INTO Notes (title, description) VALUES (?, ?)', [title, description]);
        })
        this.updateList()
    }

    updateList = async () => {
        this.db.transaction(async(tx) => {
            await tx.executeSql('SELECT * FROM Notes', [], (tx, results) => {
                let len = results.rows.length;
                let notes = [];
                for (let i = 0; i < len; i++) 
                    notes.push(results.rows.item(i));
                this.setState({notes: notes});
            });
        })
    };

    deleteData = async (id) => {
        this.db.transaction(async (tx) => {
            await tx.executeSql('DELETE FROM Notes WHERE id = ?', [id]);
        })
        this.updateList()
    }

    dropTable = async () => {
        this.db.transaction(async (tx) => {
            await tx.executeSql('DROP TABLE IF EXISTS Notes');
        })
    }

    handleBookmark = (item) => {
        this.setState({
            notes: this.state.notes.map(note => {
                if (note.id === item.id) {
                    note.isBookmarked = !note.isBookmarked;
                }
                return note;
            })
        });
    }

    renderBody(){
        if(this.state.selectedId!=-1){
            var ind =-1;
            for (let index = 0; index < this.state.notes.length; index++) {
                if(this.state.notes[index].id == this.state.selectedId){
                    ind = index
                    break;
                }
            }
            return <Note data={this.state.notes[ind]} nId={this.state.selectedId} db={this.db} onSave = {(id, title, desc)=>this.updateData(id,title,desc)} />
        }
        else{
            return (
                <FlatList
                    style={styles.list}
                    data={this.state.notes}
                    renderItem={({item}) => <Item onDelete={(id)=>{this.deleteData(id)}} onClickNote={this.clickNote} data = {{heading:item.title, desc: item.description, id: item.id}} />}
                />
            );
        }
    }

    clickNote = (id) => {
        this.setState({selectedId:id, headerLeft:'Back', headerRight:'minus'});
    }
    back = () => {
        this.setState({selectedId:-1, headerLeft:'Notes', headerRight:'plus'});
        this.updateList()
    }

    render() {
        return (
            <View style={styles.full}>
              <View style={styles.header}>
                <TouchableOpacity onPress={()=>{this.back()}} >
                    <Text style={styles.heading}>{this.state.headerLeft}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={
                    ()=>{
                        if(this.state.selectedId!=-1){
                            console.log(1)
                        }
                        else{this.addData("-","-");}}
                    } >
                    <Text><Icon2 name={this.state.headerRight} size={30} color='white'/></Text>
                </TouchableOpacity>
              </View>
              {this.renderBody()}
              
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header:{
        padding:20,
        height:75,
        backgroundColor: '#007a99',
        
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    list: {
        paddingTop:10,
        paddingLeft:7,
        paddingRight:7,
    },
    full:{
        backgroundColor:'white',
        height:'100%'
    },
    heading:{
        fontSize:25,
        color:'white',
        
    }
});

export default Home;