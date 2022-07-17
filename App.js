import React from 'react';
import {View, StyleSheet, Text, FlatList, Button,} from 'react-native';
import Slider from '@react-native-community/slider';
import * as Progress from 'react-native-progress';
import SQLite from 'react-native-sqlite-storage';

import Item from './components/item.js';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      surahData:[], 
      pagesMemorized:0, 
      juzByDemarcation:0, 
      noOfSurahs:0, 
      totalPages:1,
      surahIndex:0,
    };
    
    this.initApp();
  }

  GOLDEN = '#ffc34d'
  TOTAL_PAGES = 600
  db = SQLite.openDatabase({name: 'QuranData', location:'default'}, ()=>{}, error=>(console.log(error)));

  initApp = async () => {
    this.db.transaction(async (tx) => {
      await tx.executeSql('DROP TABLE IF EXISTS Data');
    })
    this.db.transaction(async (tx) => {
        await tx.executeSql('CREATE TABLE IF NOT EXISTS Data (name TEXT PRIMARY KEY, pages REAL, memorized INTEGER, ajza TEXT)');
    })
    if(this.state.surahData.length==0){
      this.db.transaction(async (tx) => {
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Fatihah", 1, 1, "1"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Baqarah", 48, 0, "1,2,3"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Aal e Imran",  27, 0, "3,4"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Nisaa",  29.4, 0, "4,5,6"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Maaidah", 21.6, 0, "6,7"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al An'aam", 23, 0, "7,8"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al A'raaf", 26, 0, "8,9"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Anfaal",  10, 0, "9,10"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Taubah", 21, 0, "10,11"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Yunus",  13.5, 0, "11"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Hud", 14, 0, "12"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Yusuf", 13.5, 1, "12,13"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Ra'd",  6.2, 0, "13"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Ibrahim", 6.8, 0, "13"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Hijr",  5.5, 0, "14"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Nakhl", 14.5, 0, "14"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Isra", 11.7, 0, "15"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Kahf", 11.3,  1, "15,16"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Maryam", 7.3, 1, "16"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Taha", 9.7, 1, "16"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Anbiya", 10, 0, "17"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Hajj", 10, 0, "17"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Mumenoon", 8, 1,  "18"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Noor", 9.7, 0, "18"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Furqan", 7.3, 1, "18,19"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Shu'raa", 10, 0, "19"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Naml", 8.5, 0, "19,20"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Qasas", 11, 0, "20"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Ankaboot", 8, 0, "20,21"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Room", 6.5, 0, "21"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Luqman", 4, 1, "21"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Sajdah", 3, 1, "21"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Ahzaab", 10, 0, "21,22"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Saba", 6.5, 0, "22"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Faatir", 5.7, 0, "22"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Yaseen", 5.8, 1, "22,23"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Saafaat", 7, 0, "23"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Saad",  5.2, 0, "23"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Zumur", 8.9, 0, "23,24"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Ghaafir", 9.9, 0, "24"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Fussilat", 6, 0, "24,25"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Shuraa", 6.3, 0, "25"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Zukhruf", 6.7, 0, "25"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Dukhaan", 3, 0, "25"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Jathiyah", 3.5, 0, "25,26"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Ahqaaf", 4.5, 0, "26"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Muhammad", 4, 0, "26"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Fath", 4.5, 1, "26"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Hujuraat", 2.5, 1, "26"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Qaf",  2.9, 1, "26"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Zariyat", 2.6, 1, "26,27"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Tur", 2.5, 1, "27"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Najm", 2.6, 1, "27"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Qamar", 2.7, 1, "27"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Rahmaan", 3.2, 1, "27"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Waaqiah", 3.3, 1, "27"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Hadid",  4.2, 1, "27"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Mujaadilah", 3.5, 1, "28"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Hashr", 3.5, 1, "28"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Mumtahina", 2.5, 1, "28"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Saff", 1.5, 1, "28"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Jumuah", 1.5, 1, "28"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Munafiqoon", 1.5, 1, "28"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Taghabun", 2, 1, "28"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Talaq", 2, 1, "28"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Tahrim", 2, 1, "28"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Mulk", 2.4, 1, "29"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Noon" , 2.3, 1, "29"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Haaqah", 1.9, 1, "29"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Ma'arij", 1.8, 1, "29"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Nooh", 1.6, 1, "29"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Jinn", 2, 1, "29"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Muzzammil", 1.5, 1, "29"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Mudathir", 2, 1, "29"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Qiyamah", 1.2, 1, "29"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Insaan", 1.8, 1, "29"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Mursalaat", 1.5, 1, "29"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Naba", 1.5, 1, "30"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Nazi'aat", 1.5, 1, "30"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Abasa", 1, 1, "30"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Takwir", 1, 1, "30"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Infitaar", 0.8, 1, "30"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Mutaffifeen", 1.3, 1, "30"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Inshiqaaq", 0.9, 1, "30"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Burooj", 1, 1, "30"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Tariq", 0.7, 1, "30"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al A'la", 0.6, 1, "30"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Ghashiyah", 0.9, 1, "30"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Fajr", 1.2, 1, "30"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Balad", 0.6, 1, "30"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Shams", 0.6, 1, "30"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Layl", 0.8, 1, "30"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Dhuha", 0.6, 1, "30"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Sharh", 0.3, 1, "30"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Teen", 0.3, 1, "30"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Alaq", 0.6, 1, "30"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Qadr", 0.3, 1, "30"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Bayyinah", 0.7, 1, "30"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Zalzalah", 0.3, 1, "30"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Aadiyat", 0.4, 1, "30"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Qariyah", 0.3, 1, "30"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Takathur", 0.3, 1, "30"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Asr", 0.3, 1, "30"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Humazah", 0.3, 1, "30"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Feel", 0.3, 1, "30"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Quraysh", 0.3, 1, "30"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Ma'un", 0.3, 1, "30"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Kauthar", 0.3, 1, "30"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Kafiroon", 0.3, 1, "30"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Nasr", 0.3, 1, "30"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Masad", 0.3, 1, "30"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Ikhlaas", 0.3, 1, "30"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Falaq", 0.3, 1, "30"])
        await tx.executeSql('INSERT INTO Data (name, pages, memorized, ajza) VALUES (?, ?, ?, ?)', ["Al Naas", 0.3, 1, "30"])
      })
    }
    this.updateState()
  }

  updateState = async () => {
    this.db.transaction(async(tx) => {
        await tx.executeSql('SELECT * FROM Data', [], (tx, results) => {
            let len = results.rows.length;
            let surahData = [], juzTable=[], pagesMemorized=0, juzByDemarcation=0, noOfSurahs=0, totalPages=0;
            for (let i = 0; i <30; i++)juzTable.push(true)
            for (let i = 0; i < len; i++){
              surahData.push({...results.rows.item(i), key:i});
              totalPages+=surahData[surahData.length-1].pages
              if(surahData[surahData.length-1].memorized==1){
                pagesMemorized+=surahData[surahData.length-1].pages
                noOfSurahs++
              }
              else {
                let ajza = surahData[surahData.length-1].ajza.split(",")
                for(let j=0;j<ajza.length;j++)juzTable[parseInt(ajza[j])-1]=false
              }
            }
            for (let i = 0; i < 30; i++)if(juzTable[i])juzByDemarcation++
            this.setState({surahData: surahData, pagesMemorized:pagesMemorized, 
              juzByDemarcation:juzByDemarcation,noOfSurahs:noOfSurahs, totalPages:parseInt(totalPages)});
        });
    })
  };

  itemClick = async (name, memorized)=>{
    this.db.transaction(async (tx) => {
        await tx.executeSql('UPDATE Data SET memorized = ? WHERE name = ?', [memorized, name]);
    })
    this.updateState()
  }

  changeSurah(dir){
    var newIndex = Math.max(0,(this.state.surahIndex+dir)%114)
    this.setState({surahIndex:newIndex})
  }

  changeSurahBySlider(val){
    val = Math.round(val)
    val = Math.min(Math.max(val,0),114)
    // setTimeout(()=>this.setState({surahIndex:val}), 1000)
    this.setState({surahIndex:val})
  }

  renderItem = (data)=>{
    return <Item 
        key={data["item"]["key"]} onClickItem={(name, memorized)=>this.itemClick(name, memorized)} 
        data = {{name:data["item"]["name"], noPages: data["item"]["pages"], 
        borderColor:data["item"]["memorized"]==1?this.GOLDEN:'white'}}
      />
  }

  render() {
    return (
      <View style={styles.main}>
        <View style={styles.header}>
          <Text style={styles.heading}>Rafeeq - Hifdh Tracker</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.mainCard}>
            <View style={{width:"100%", justifyContent:'center', flexDirection:'row'}}>
              <Progress.Circle showsText={true} progress={(this.state.pagesMemorized/(this.state.totalPages<600?600:this.state.totalPages)).toFixed(2)} 
                size={150} color={'#1aff66'} thickness={10} strokeCap={'round'} borderWidth={3} borderColor={'lightgray'}
                formatText={()=>{return Math.min(100,((this.state.pagesMemorized/this.state.totalPages)*100).toFixed(2))+"%"}} />
            </View>

            <View style={{width:"100%", justifyContent:'center', flexDirection:'row', marginTop:20}}>
              <View>
                <Text style={{color:'white', fontSize:20, textAlign:'center'}}>{"Stats"}</Text>
                <Text style={{color:this.GOLDEN, textAlign:'center'}}>{"Juz by no. of Pages: "+parseInt(this.state.pagesMemorized/20)}</Text>
                <Text style={{color:this.GOLDEN, textAlign:'center'}}>{"Juz by demarcation: "+this.state.juzByDemarcation}</Text>
                <Text style={{color:this.GOLDEN, textAlign:'center'}}>{"Surahs: "+this.state.noOfSurahs}</Text>
                <Text style={{color:this.GOLDEN, textAlign:'center'}}>{"Pages: "+parseInt(this.state.pagesMemorized)}</Text>
              </View>
            </View>
          </View>
        </View>
        {/* <View style={styles.bottom}>
          <Text style={{width:'100%', textAlign:'center', color:this.GOLDEN, fontSize:20, padding:10}} >Surah: {this.state.surahIndex+1}</Text>
          {
            this.state.surahData.length==0?<Text>sds</Text>:
            <View>
              <Item onClickItem={(name, memorized)=>this.itemClick(name, memorized)} 
                step={1}
                data = {{name:this.state.surahData[this.state.surahIndex].name, 
                noPages: this.state.surahData[this.state.surahIndex].pages,
                borderColor:this.state.surahData[this.state.surahIndex].memorized==1?this.GOLDEN:'white'}}/>
            </View>
          }
          <View style={{justifyContent:'center', flexDirection:'row'}}>
            <Slider
                value={this.state.surahIndex}
                style={{width: '95%', height: 50, position:'relative'}}
                minimumValue={0}
                maximumValue={113}
                minimumTrackTintColor="blue"
                maximumTrackTintColor="gray"
                onValueChange={val=>this.changeSurahBySlider(val)}
                // onSlidingComplete={val=>this.changeSurahBySlider(val)}
            />
          </View>
          
          <View style={styles.buttonView}>
            <Button style={{backgroundColor:'transparent'}} title='Back' onPress={()=>this.changeSurah(-1)}/>
            <Button style={{backgroundColor:'transparent'}} title='Front' onPress={()=>this.changeSurah(1)}/>
          </View>
        </View> */}
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.list}
          extraData={this.state}
          data={this.state.surahData}
          windowSize={5}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main:{
    height:'100%',
    backgroundColor:'#00394d',
  },
  container:{
    padding:10,
    height:'40%',
  },
  mainCard:{
    borderWidth:1.5,
    borderColor:'#006080',
    borderRadius:5,
    padding:20,
    flexDirection:'column',
    justifyContent:'space-evenly',
  },
  header:{
    padding:10,
    height:'7%',
    backgroundColor: '#002e4d',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  bottom:{
    marginTop:10,
    borderTopWidth:2,
    borderBottomWidth:2,
    paddingTop:10,
    borderColor:'#006080',
    height:'45%',
    margin:10
  },
  buttonView:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  list:{
    marginTop:10,
    borderTopWidth:2,
    borderBottomWidth:2,
    paddingTop:10,
    borderColor:'#006080',
    height:'45%',
    margin:10
  },
  full:{
    backgroundColor:'white',
    height:'100%'
  },
  heading:{
    fontSize:18,
    color:"white",
  }
});

export default App;
