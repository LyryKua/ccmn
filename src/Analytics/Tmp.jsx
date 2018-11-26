import React, { Component } from 'react';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { DateRangePicker } from 'react-date-range';
import * as rdrLocales from 'react-date-range';

import { format, addDays } from 'date-fns';

const nameMapper = {
    ar: 'Arabic (Modern Standard Arabic - Al-fussha)',
    bg: 'Bulgarian',
    ca: 'Catalan',
    cs: 'Czech',
    da: 'Danish',
    de: 'German',
    el: 'Greek',
    enGB: 'English (United Kingdom)',
    enUS: 'English (United States)',
    eo: 'Esperanto',
    es: 'Spanish',
    fi: 'Finnish',
    fil: 'Filipino',
    frCH: 'French',
    fr: 'French',
    hr: 'Croatian',
    id: 'Indonesian',
    is: 'Icelandic',
    it: 'Italian',
    ja: 'Japanese',
    ko: 'Korean',
    mk: 'Macedonian',
    nb: 'Norwegian Bokmål',
    nl: 'Dutch',
    pl: 'Polish',
    pt: 'Portuguese',
    ro: 'Romanian',
    ru: 'Russian',
    sk: 'Slovak',
    sv: 'Swedish',
    th: 'Thai',
    tr: 'Turkish',
    ua: 'Ukrainian',
    vi: 'Vietnamese',
    zhCN: 'Chinese Simplified',
    zhTW: 'Chinese Traditional',
};

const localeOptions = Object.keys(rdrLocales).map(key => ({
    value: key,
    label: `${key} - ${nameMapper[key] || ''}`,
}));

function formatDateDisplay(date, defaultText) {
    if (!date) return defaultText;
    return format(date, 'MM/DD/YYYY');
}

class Tmp extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            dateRange: {
                selection: {
                    startDate: new Date(),
                    endDate: null,
                    key: 'selection',
                },
            },
            dateRangeWithDisabled: {
                selection: {
                    startDate: addDays(new Date(), 4),
                    endDate: null,
                    key: 'selection',
                },
            },
            definedRange: {
                selection: {
                    startDate: new Date(),
                    endDate: new Date(),
                    key: 'selection',
                },
            },
            dateRangePickerI: {
                selection: {
                    startDate: new Date(),
                    endDate: null,
                    key: 'selection',
                },
                compare: {
                    startDate: new Date(),
                    endDate: addDays(new Date(), 3),
                    key: 'compare',
                },
            },
            multipleRanges: {
                selection1: {
                    startDate: addDays(new Date(), 1),
                    endDate: null,
                    key: 'selection1',
                },
                selection2: {
                    startDate: addDays(new Date(), 4),
                    endDate: addDays(new Date(), 8),
                    key: 'selection2',
                },
                selection3: {
                    startDate: addDays(new Date(), 8),
                    endDate: addDays(new Date(), 10),
                    key: 'selection3',
                    showDateDisplay: false,
                    autoFocus: false,
                },
            },
            datePickerInternational: null,
            locale: 'ja',
            dateRangePicker: {
                selection: {
                    startDate: new Date(),
                    endDate: addDays(new Date(), 7),
                    key: 'selection',
                },
            },
        };
    }

    handleChange(which, payload) {
        console.log(which, payload);
        this.setState({
            [which]: payload,
        });
    }

    handleRangeChange(which, payload) {
        console.log(which, payload);
        this.setState({
            [which]: {
                ...this.state[which],
                ...payload,
            },
        });
    }

    render() {
        return (
            <div>
                <DateRangePicker
                    onChange={this.handleRangeChange.bind(this, 'dateRangePicker')}
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    className={'PreviewArea'}
                    months={2}
                    ranges={[this.state.dateRangePicker.selection]}
                    direction="horizontal"
                />
            </div>
        )
    }

}

export default Tmp;
