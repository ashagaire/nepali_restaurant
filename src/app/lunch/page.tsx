import React from 'react';
import LunchInfo from '@/components/lunch/LunchInfo';
import LunchBuffetList from '@/components/lunch/LunchBuffetList';
import { ImportantNotice } from '@/components/utils/Notice';

export default function LunchPage() {
    return (
        <section className="">
            <LunchInfo />
            <LunchBuffetList />
            <ImportantNotice />
        </section>
    );
}