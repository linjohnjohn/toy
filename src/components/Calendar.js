import React, { Component } from 'react';
import { View, Text, Button, Animated } from 'react-native';
import { Droppable } from '../dnd';
import { FontAwesome } from '@expo/vector-icons';

class MyCalendar extends Component {
    months = ["January", "February", "March", "April",
        "May", "June", "July", "August", "September", "October",
        "November", "December"];

    weekDays = [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
    ];

    nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    state = {
        activeDate: new Date()
    }

    generateMatrix() {
        const matrix = [];
        // Create header
        matrix[0] = this.weekDays;

        const year = this.state.activeDate.getFullYear();
        const month = this.state.activeDate.getMonth();

        const dateOfFirstDay = new Date(year, month, 1);
        const firstDay = dateOfFirstDay.getDay();
        dateOfFirstDay.setDate(1 - firstDay);
        const firstSlotDate = dateOfFirstDay;

        // const maxDays = this.nDays[month];
        // if (month == 1) { // February
        //     if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        //         maxDays += 1;
        //     }
        // }

        let currentDate = firstSlotDate;
        for (let row = 1; row < 7; row++) {
            matrix[row] = [];
            for (let col = 0; col < 7; col++) {
                matrix[row][col] = currentDate;
                const nextDate = new Date(currentDate.getTime());
                nextDate.setDate(nextDate.getDate() + 1);
                currentDate = nextDate;
            }
        }

        return matrix;

    }

    _onPress = (item) => {
        this.setState({
            activeDate: item
        });

        const { onDateChange } = this.props;
        onDateChange ? onDateChange(item) : null;
    };

    changeMonth = (n) => {
        this.setState(() => {
            this.state.activeDate.setMonth(
                this.state.activeDate.getMonth() + n
            )
            return this.state;
        });
    }

    render() {
        const { dateToPlans, onPotentialDateChange, onPotentialDateReset, startPotentialDate, endPotentialDate } = this.props;
        const matrix = this.generateMatrix();
        const rows = matrix.map((row, rowIndex) => {
            const rowItems = row.map((item, colIndex) => {
                if (rowIndex === 0) {
                    return <Text
                        style={{
                            flex: 1,
                            height: 18,
                            textAlign: 'center',
                            // Highlight header
                            backgroundColor: '#ddd',
                            // Highlight Sundays
                            color: colIndex == 0 ? '#a00' : '#000',
                            // Highlight current date
                            fontWeight: item.getTime && item.getTime() === this.state.activeDate.getTime()
                                ? 'bold' : ''
                        }}
                        onPress={() => this._onPress(item)}>
                        {item}
                    </Text>
                }

                const isPlannedDate = dateToPlans[String(item.getTime())] ;
                const isPotentialDate = startPotentialDate && endPotentialDate && item.getTime() >= startPotentialDate.getTime() && item.getTime() < endPotentialDate.getTime()
                return (
                    <Droppable
                        onEnter={() => {
                            onPotentialDateChange(item);
                        }}
                        onLeave={() => {
                            onPotentialDateReset();
                        }}
                        onDrop={() => {
                            
                        }}
                    >{({ active, viewProps }) => {
                        return <Animated.View 
                        {...viewProps}
                        style={{
                            flex: 1,
                            flexDirection: "column",
                            height: 24
                        }}>
                            <Text
                                style={{
                                    borderColor: 'blue',
                                    flex: 1,
                                    height: 18,
                                    textAlign: 'center',
                                    // Highlight header
                                    backgroundColor:'#fff',
                                    // Highlight Sundays
                                    color: colIndex == 0 ? '#a00' : '#000',
                                    // Highlight current date
                                    fontWeight: item.getTime && item.getTime() === this.state.activeDate.getTime()
                                        ? 'bold' : ''
                                }}
                                onPress={() => {this._onPress(item)}}
                                >
                                {item.getDate()}
                            </Text>
                            { isPlannedDate ? <FontAwesome name="circle" style={{alignSelf: "center"}} size={6} color="red"></FontAwesome> : null }
                            { isPotentialDate ? <FontAwesome name="circle" style={{alignSelf: "center"}} size={6} color="blue"></FontAwesome> : null }
                        </Animated.View>
                    }}

                    </Droppable>
                );
            });
            return (
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        padding: 15,
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}>
                    {rowItems}
                </View>
            );
        });
        return (
            <View>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    textAlign: 'center'
                }}>
                    {this.months[this.state.activeDate.getMonth()]} &nbsp;
  {this.state.activeDate.getFullYear()}
                </Text>
                {rows}
                <Button title="Previous"
                    onPress={() => this.changeMonth(-1)} />
                <Button title="Next"
                    onPress={() => this.changeMonth(+1)} />
            </View>
        );
    }
}

export default MyCalendar;