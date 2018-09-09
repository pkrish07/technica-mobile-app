import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  FlatList,
  View,
  ActivityIndicator
} from 'react-native';
import { H1, H2, H3, H4, P } from '../components/Text';
import {
  PlainViewContainer,
  ViewContainer,
  PadContainer,
  Heading
} from '../components/Base';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import EventGroupComponent from '../components/schedule/EventGroupComponent';
import ScheduleSceneTabBar from '../components/schedule/ScheduleSceneTabBar';
import { colors } from '../components/Colors';

export default class Schedule extends Component<Props> {
  constructor(props) {
    super(props);

    this.renderScheduleForDay = this.renderScheduleForDay.bind(this);
  }

  componentDidMount() {}

  renderScheduleForDay(eventDayObj) {
    eventDay = eventDayObj.item;
    return (
      <FlatList
        key={eventDay.label}
        data={eventDay.eventGroups}
        renderItem={this.renderEventCard.bind(this)}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}
      />
    );
  }

  renderEventCard(eventGroupObj) {
    eventGroup = eventGroupObj.item;
    return (
      <EventGroupComponent
        header={eventGroup.label}
        events={eventGroup.events}
        eventManager={this.props.eventManager}
      />
    );
  }

  render() {
    let tabNames = this.props.eventManager
      .getEventDays()
      .map(eventDay => eventDay.label);
    return (
      <PlainViewContainer>
        <FlatList
          data={this.props.eventManager.getEventDays()}
          renderItem={this.renderScheduleForDay}
          ListHeaderComponent={() => (
            <PadContainer>
              <Heading>Schedule</Heading>
              <ScheduleSceneTabBar
                goToSection={i => {
                  this.scheduleListRef.scrollToIndex({
                    index: i,
                    viewOffset: 100,
                    viewPosition: 0
                  });
                }}
                tabs={tabNames}
                activeTab={0}
              />
            </PadContainer>
          )}
          ItemSeparatorComponent={() => (
            <PadContainer
              style={{
                marginTop: 20,
                borderTopWidth: 1,
                borderColor: colors.borderGrey,
                paddingTop: 30,
              }}
            >
              <ScheduleSceneTabBar
                goToSection={i => {
                  this.scheduleListRef.scrollToIndex({
                    index: i,
                    viewOffset: 100,
                    viewPosition: 0
                  });
                }}
                tabs={tabNames}
                activeTab={1}
              />
            </PadContainer>
          )}
          keyExtractor={(eventDay, index) => eventDay.label}
          ref={ref => {
            this.scheduleListRef = ref;
          }}
        />
      </PlainViewContainer>
    );
  }
}
