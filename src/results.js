import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Picker,
  StyleSheet,
  StatusBar,
  ScrollView,
  Button,
} 
from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';


export default class myApp extends Component {
 
  constructor(){
    super()
    this.state = {
    }
  }

  
  
 
  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#2369b3',
      }}>        
        <StatusBar backgroundColor="#2369b3" barStyle="light-content" />
        {/* View do Header da página */}
        <View style={{
          backgroundColor: '#2369b3',
          paddingBottom: 0.1,
          padding: 15,
          paddingTop: 25,
          flex: 0.3,
        }}
        >
          {/* Título da página */}
          <Text style={{
            color: 'white',
            fontSize: 40,
            fontFamily: 'inherit',
            fontWeight: 'bold',
          }}
          >
                Portal da {"\n"}Transparência

          </Text>

          
          {/* Subtitulo da página */}
          <Text style={{
            fontSize: 20,
            color: '#ffff',
          }}
          >
                Controladoria-Geral da União
          </Text>
        </View>
        { /* Faixa azul escuro abaixo do header */ }
        <View style={{ 
          backgroundColor: '#0E4097', flex: 0.05 }}>
        </View>
        
     

        
        <View style={{
          backgroundColor: '#ffff',
          flex: 0.7
        }}
        >
        <Text style={{
          fontSize: 14,
          fontWeight: 'bold', paddingTop: 10}}> Orgão Superior:  </Text>
        <Text style={{
          fontSize: 14, 
          fontWeight: 'bold'}}> Orgão Subordinado: </Text>
        <Text style={{
          fontSize: 14,
          fontWeight: 'bold'}}> Unidade Gestora: </Text>
        <Text style={{
          fontSize: 14,
          fontWeight: 'bold'}}> Período:  </Text>
        <Text style={{fontSize: 14, paddingTop: 8, fontWeight: 'bold'}}> RESULTADO DA BUSCA </Text>
        {/*View onde os resultados serão exibidos*/}
        <View style={{flex:0.9, alignItems:'center',paddingTop:10, backgroundColor:'#FFFFDD', margin: 5}}>
        <ScrollView>
          <Text style={{fontSize: 14, fontWeight: 'bold'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis vitae et leo duis ut diam quam nulla. Vel quam elementum pulvinar etiam non quam lacus. Ipsum suspendisse ultrices gravida dictum fusce. Suspendisse ultrices gravida dictum fusce. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Ac turpis egestas maecenas pharetra convallis posuere morbi leo. Vel pretium lectus quam id leo in vitae turpis. Convallis a cras semper auctor neque vitae. Commodo viverra maecenas accumsan lacus vel. Nisi est sit amet facilisis magna etiam. Hac habitasse platea dictumst quisque sagittis purus sit amet. Blandit libero volutpat sed cras ornare arcu. Consequat nisl vel pretium lectus quam id leo in vitae. Facilisis gravida neque convallis a cras semper auctor neque. Eleifend mi in nulla posuere sollicitudin. Netus et malesuada fames ac. Dui accumsan sit amet nulla facilisi morbi tempus iaculis urna.

Laoreet non curabitur gravida arcu. Facilisis volutpat est velit egestas. Viverra aliquet eget sit amet tellus. Ut venenatis tellus in metus vulputate. Iaculis eu non diam phasellus vestibulum lorem sed. Vitae suscipit tellus mauris a. Vulputate eu scelerisque felis imperdiet proin. Dictumst vestibulum rhoncus est pellentesque. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Bibendum neque egestas congue quisque egestas diam. Vulputate enim nulla aliquet porttitor lacus. Nec feugiat in fermentum posuere urna. Cras pulvinar mattis nunc sed blandit. Volutpat lacus laoreet non curabitur. Arcu cursus vitae congue mauris. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Leo a diam sollicitudin tempor id eu nisl nunc mi. Eget duis at tellus at urna condimentum mattis pellentesque.

Vitae tortor condimentum lacinia quis vel eros donec ac. Vitae elementum curabitur vitae nunc sed velit dignissim. Tempor commodo ullamcorper a lacus vestibulum sed. Rhoncus urna neque viverra justo nec ultrices dui sapien eget. Ut faucibus pulvinar elementum integer enim. Semper eget duis at tellus at urna condimentum. Eu turpis egestas pretium aenean pharetra. Dolor morbi non arcu risus quis. Ornare massa eget egestas purus. Enim sed faucibus turpis in eu mi bibendum neque. Id consectetur purus ut faucibus pulvinar elementum integer. Fringilla est ullamcorper eget nulla facilisi etiam. Fermentum odio eu feugiat pretium. Tempus iaculis urna id volutpat lacus laoreet.

          </Text>
        </ScrollView>
        </View>
        </View>

        <View style={{ backgroundColor: '#0E4097', flex: 0.04,flexDirection: "row", justifyContent: "flex-end"}}>
          <TouchableOpacity
            onPress={() => alert("Voltando ...")}
        >
          <Icon style={{paddingRight: 50}} name="leftcircle" size={20} color='white' />
        </TouchableOpacity>
        </View>
        
      </View>
    );
  }
}