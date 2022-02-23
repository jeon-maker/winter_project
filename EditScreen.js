import React, { Component } from "react";
import { View, Text, Button , StyleSheet } from 'react-native';
import firestore , { doc  } from '@react-native-firebase/firestore';
import Load_users_post from "./edit_load";
import TouchHistoryMath from "react-native/Libraries/Interaction/TouchHistoryMath";

const style = StyleSheet.create({
    container: {
        backgroundColor: '#AEB404',
        flex: 1,
        margin : 20
    },
    text: {
        fontSize: 30,
        color: '#21610B',
        textAlign: 'center'
    },
    Button: {
        color: 'black',
        fontSize: 40,
    },
    input: {
        height: 40,
        margin: 50,
        borderWidth: 5,
        padding: 10,
        color: 'black'
    },
    box : {
         
        margin: 20,
        backgroundColor:'white',        
    }
})


export default class EditScreen extends Component {
    state = {
        prevID : this.props.route.params.prevID,
        doc_id : this.props.route.params.doc_id,
        doc_item : this.props.route.params.doc_item,
    }
    
    testing = () =>{
        const users_posts = []
        const len = this.state.doc_id.length
        for(var i = 0 ; i<len ; i++){
            const user = this.state.doc_id[i].split(" ")
            console.log("함수로 실행된 ",i , "번째 슬라이스 : ", user[0])
            if(this.state.prevID == user[0]){
                users_posts.push(this.state.doc_id[i])
            }
        }
        return(
            users_posts.map((id, idx)=>(
            <View style={style.container} key={idx}>
            <View style={style.box}>
            <Text>
                {id}
            </Text>
            <Button onPress={()=>this.delete_(id)} title={"delete"}/>
            </View>    
            </View>
            ))
        )
    }

    delete_ = (id) =>{
        const db = firestore().collection('Posts');
        db.doc(id).delete();
        alert("삭제 완료");
        this.props.navigation.navigate('Main' , {prevID:this.state.prevID})
    }

    testing2 = () =>{
        return(
        <View style={style.container}>
            <Text>this is testing 2 </Text>
        </View>)

    }

    render() {
        this.testing();
        return (
            <View style={style.container}>
            {/* <Load_users_post id ={this.state.prevID} doc_id ={this.state.doc_id} doc_item ={this.state.doc_item} /> */}
            <this.testing/> 
            </View>
        )
    }
    backToMainScreen() {
        this.props.navigation.navigate('Main')
    }
}