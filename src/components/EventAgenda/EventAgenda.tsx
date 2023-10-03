import React from 'react';
import {
  EventAgendaItem as EventAgendaItemData,
  EventAgendaTalk as EventAgendaTalkData,
  EventAgendaTbdTalk as EventAgendaTbdTalkData,
  EventContent,
  SpeakerContent,
} from '@/content.types';
import { Col, Row } from 'reactstrap';
import Image from 'next/image';
import styles from './EventAgenda.module.scss';
import DefaultProfileImage from './default-profile.svg';
import Link from 'next/link';
import cn from 'classnames';
import YoutubeEmbed from '../YoutubeEmbed';

type EventAgendaItemProps = EventAgendaItemData;

const EventAgendaItem = ({ time, description }: EventAgendaItemProps) => (
  <Row className={styles.eventAgenda__entry}>
    <Col className={styles.eventAgenda__time} md={2}>
      {time}
    </Col>
    <Col md={10}>{description}</Col>
  </Row>
);

type EventAgendaTalkProps = Omit<EventAgendaTalkData, 'speaker'> & { speaker: SpeakerContent };

const EventAgendaTalk = ({ time, title, description, speaker, youtubeVideoId }: EventAgendaTalkProps) => (
  <Row className={styles.eventAgenda__entry}>
    <Col className={styles.eventAgenda__time} md={2}>
      {time}
    </Col>
    <Col md={10}>
      <h3 className={styles.eventAgenda__title}>{title}</h3>
      <div className={styles.eventAgenda__speaker}>
        {speaker.image ? (
          <Image
            className={styles.eventAgenda__profileImage}
            src={`/data/speakers/${speaker.image}`}
            width='60'
            height='60'
            alt={`Profile photo of ${speaker.name}`}
          />
        ) : (
          <DefaultProfileImage className={styles.eventAgenda__profileImage} />
        )}
        <div className={styles.eventAgenda__speakerDetailsColumn}>
          <span className={styles.eventAgenda__speakerName}>{speaker.name}</span>
          <span className={styles.eventAgenda__speakerTitle}>
            {speaker.title} at {speaker.company}
          </span>
        </div>
      </div>
      <p>{description}</p>
      {youtubeVideoId && <YoutubeEmbed videoId={youtubeVideoId} />}
    </Col>
  </Row>
);

type EventAgendaTbdProps = EventAgendaTbdTalkData;

const EventAgendaTbdTalk = ({ time }: EventAgendaTbdProps) => (
  <Row className={styles.eventAgenda__entry}>
    <Col className={styles.eventAgenda__time} md={2}>
      {time}
    </Col>
    <Col md={10}>
      <h3 className={cn(styles.eventAgenda__title, styles['eventAgenda__title--tbd'])}>Unannounced talk</h3>
      <p>
        This talk is yet to be announced. Please{' '}
        <Link href='/contact'>
          <span>contact us</span>
        </Link>{' '}
        if you are interested in presenting.
      </p>
    </Col>
  </Row>
);

type EventAgendaProps = {
  speakers: Record<string, SpeakerContent>;
  event: Omit<EventContent, 'date'> & {
    dateTimestamp: number;
  };
};

const EventAgenda = ({ event: { agenda }, speakers }: EventAgendaProps) => (
  <section className={styles.eventAgenda}>
    {agenda.map((agendaItem, i) => {
      if (agendaItem.type == 'item') {
        return <EventAgendaItem key={i} {...agendaItem} />;
      } else if (agendaItem.type == 'tbd') {
        return <EventAgendaTbdTalk key={i} {...agendaItem} />;
      } else {
        return <EventAgendaTalk key={i} {...agendaItem} speaker={speakers[agendaItem.speaker]} />;
      }
    })}
  </section>
);

export default EventAgenda;
