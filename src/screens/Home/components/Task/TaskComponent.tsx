/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import 'moment/min/moment-with-locales';
import momentPt from 'moment/src/locale/pt';

import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

import {icons, SIZES, COLORS, FONTS} from '../../../../constants';
import {Goal} from '../../../../models/goal/goal';
import {Task} from '../../../../models/goal/task';
import User from '../../../../models/main/User';
import {GoalService} from '../../../../services/goal/Goal.service';

const TaskComponent = ({navigation}) => {
  // Dummy Datas
  moment.locale('pt', momentPt);

  const [TaskList, setTaskList] = React.useState([]);
  const [ActiveTaskList, setActiveTaskList] = React.useState([]);
  //let call=new GoalService();

  React.useEffect(() => {
    GoalService.me().then((u: User) => {
      new GoalService()
        .all({userId: u.id})
        .then((goals: Goal) => {
          let lSunday, nSunday, oSunday, now;
          lSunday = oSunday = now = new Date(new Date().setHours(0, 0, 0, 0));
          nSunday = new Date(new Date().setHours(0, 0, 0, 0));
          lSunday.setDate(lSunday.getDate() - (lSunday.getDay() || 7));
          nSunday.setDate(nSunday.getDate() - (nSunday.getDay() || 7) + 7);

          let tasks = goals
            .map(goal => goal.tasks)
            .reduce((x, y) => x.concat(y), []);
          tasks.forEach(task => (task.categories = []));
          tasks
            .filter(
              task => new Date(task.dueDate) < now && parseInt(task.state) < 3,
            )
            .forEach((task: Task) => {
              task.categories.push('OVERDUE');
            });
          tasks
            .filter(
              task =>
                new Date(task.dueDate) > lSunday &&
                new Date(task.dueDate) < nSunday &&
                parseInt(task.state) < 3,
            )
            .forEach((task: Task) => {
              task.categories.push('THISWEEK');
            });

          tasks
            .filter(
              task =>
                moment().format('YYYY-MM-DD') ===
                moment(task.dueDate).format('YYYY-MM-DD'),
            )
            .forEach((task: Task) => {
              task.categories.push('TODAY');
            });

          setTaskList(tasks);
          setActiveTaskList(tasks);
        })
        .catch(e => {
          let y = e;
        });
    });
  }, []);

  const categoryData = [
    {
      id: 0,
      name: 'Todas',
      icon: icons.calendar_i,
      key: null,
    },
    {
      id: 1,
      name: 'Pendentes',
      icon: icons.calendar_e,
      key: 'TODAY',
    },
    {
      id: 2,
      name: 'Atraso',
      icon: icons.calendar_o,
      key: 'OVERDUE',
    },
    {
      id: 3,
      name: 'Semanal',
      icon: icons.calendar_u,
      key: 'THISWEEK',
    },
  ];

  const [selectedCategory, setSelectedCategory] = React.useState({key: null});

  function onSelectCategory(category) {
    //filter restaurant
    setSelectedCategory(category);
    setActiveTaskList(
      TaskList.filter(
        a => a.categories.includes(category.key) || category.key === null,
      ),
    );
  }

  function renderMainCategories() {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          style={{
            padding: SIZES.padding,
            paddingBottom: SIZES.padding * 2,
            backgroundColor:
              selectedCategory?.key === item.key
                ? COLORS.primary
                : COLORS.white,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: SIZES.padding,
            ...styles.shadow,
          }}
          onPress={() => onSelectCategory(item)}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                selectedCategory?.id == item.id
                  ? COLORS.white
                  : COLORS.lightGray,
            }}>
            <Image
              source={item.icon}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
              }}
            />
          </View>

          <Text
            style={{
              marginTop: SIZES.padding,
              color:
                selectedCategory?.id === item.id ? COLORS.white : COLORS.black,
              ...FONTS.body5,
            }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{padding: SIZES.padding * 2}}>
        <Text style={{...FONTS.h1}}>Tarefas</Text>
        <FlatList
          data={categoryData}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{paddingVertical: SIZES.padding * 2}}
        />
      </View>
    );
  }
  const colorState = ({state}) =>
    ['default', 'danger', 'warning', 'success', 'danger'][state];
  function renderRestaurantList() {
    const renderItem = ({item}) => (
      <TouchableOpacity>
        <View
          style={[
            styles.shadow,
            styles.task,
            {borderLeftColor: COLORS[colorState(item)]},
          ]}>
          <Text>{moment(item.dueDate).format('dddd, D [de] MMMM ')}</Text>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={{flex: 4, fontSize: SIZES.h3}}>
              {item.descriptions}
            </Text>

            <View style={{flex: 1, alignContent: 'flex-end'}}>
              <Text
                style={{
                  flex: 1,
                  alignContent: 'flex-end',
                  color: COLORS.darkgray,
                }}>
                {
                  [
                    'Pendente',
                    'Por inicial',
                    'Em curso',
                    'Concluido',
                    'Cancelado',
                  ][item.state]
                }
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );

    return (
      <View
        style={{
          marginHorizontal: SIZES.padding * 2,
          paddingBottom: 30,
          backgroundColor: COLORS.white,
        }}>
        <FlatList
          data={ActiveTaskList.slice(0, 4)}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{}}
        />
        {ActiveTaskList.length === 0 ? (
          <View style={[styles.emptyTask]}>
            <Text style={{color: COLORS.darkgray}}> Não existe agenda</Text>
          </View>
        ) : (
          <></>
        )}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderMainCategories()}
      {renderRestaurantList()}
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  task: {
    marginBottom: 2,
    padding: SIZES.padding,
    paddingBottom: SIZES.padding * 2,
    justifyContent: 'center',
    marginRight: SIZES.padding,
    borderLeftColor: '#F00',
    borderLeftWidth: 5,
  },
  emptyTask: {
    marginBottom: 2,
    padding: SIZES.padding,
    paddingBottom: SIZES.padding * 2,
    justifyContent: 'center',
    marginRight: SIZES.padding,
    borderStyle: 'dotted',
    borderWidth: 1,
    borderColor: COLORS.darkgray,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});

export default TaskComponent;
