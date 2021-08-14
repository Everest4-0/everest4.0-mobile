import React from 'react';
import { Dimensions, View, Text } from 'react-native'
import { ProgressChart } from 'react-native-chart-kit'

import { AuthContext } from '../../../components/context';
import { progressChartData } from './data'
import 'babel-polyfill'
import { COLORS, FONTS } from '../../../constants'
import { GoalService } from '../../../services/goal/Goal.service'
import { Task } from '../../../models/goal/task'
import { AuthService } from '../../../services/main/Auth.service';
import User from '../../../models/main/User';

// in Expo - swipe left to see the following styling, or create your own
const chartConfig = {
    backgroundColor: COLORS.primary,
    backgroundGradientFrom: COLORS.primary,
    backgroundGradientTo: COLORS.solid,
    backgroundGradientToOpacity:0.6,
    barRadius:5,
    style: {},
    color: (opacity = 1) => `rgba(${255}, ${255}, ${255}, ${opacity})`
}

const labelStyle = {
    color: chartConfig.color(),
    marginVertical: 10,
    textAlign: 'center',
    fontSize: 18
  }

const GoalChart = ({ }) => {

    const [Data, setData] = React.useState({ data: [] })
    const width = Dimensions.get('window').width - 30
    const height = 220;
    //let call=new GoalService();

    React.useEffect(() => {
        GoalService.me().then((u: User) => {
            (new GoalService()).all({ userId: u.id }).then((goals) => {
                let lSunday, nSunday, oSunday, now;
                lSunday = oSunday = now = new Date((new Date()).setHours(0, 0, 0, 0));
                nSunday = new Date((new Date()).setHours(0, 0, 0, 0));
                lSunday.setDate(lSunday.getDate() - (lSunday.getDay() || 7));
                nSunday.setDate(nSunday.getDate() - (nSunday.getDay() || 7) + 7);

                let tasks = goals.map(goal => goal.tasks).reduce((x, y) => x.concat(y), [])

                let done = tasks.filter(task => new Date(task.dueDate) > lSunday).filter((x: Task) => x.state > 2).length
                let all = tasks.filter(task => new Date(task.dueDate) > lSunday).length;

                let final = {
                    labels: ["ToDo", "Done "], // optional
                    data: [parseFloat((100 * (done / all) || 0).toFixed(2)) / 100, parseFloat((100 * ((all - done) / all) || 0).toFixed(2)) / 100]
                };
                setData(final)
            }).catch(e => {
                let y = e
            })

        });
    }, [])
    const graphStyle = {
        borderRadius: 15,
        ...chartConfig.style
    }
    return (
        <View style={{ backgroundColor: COLORS.primary, padding: 15 }}>
            <Text style={labelStyle}>% Objectivos semanais</Text>
            <ProgressChart
                data={Data}
                width={width}
                height={height}
                chartConfig={chartConfig}
                style={graphStyle}
            />
        </View>
    )

}

export default GoalChart;