export interface UserInfo {
    user_id: string;
    user_name: string;
    company: string;
    job_title: string;
    avatar_large: string;
    level: number;
    power: number;
    phone: string;
    email: string;
    allow_notification: boolean;
    rank_index: number;
    wallet_total_bill: number;
    description: string;
    blog_address: string;
    is_black: boolean;
    editor_type: string;
    register_time: number;
    update_time: number;
    administrator: number;
    builder: number;
    favorable_author: number;
    book_author: number;
    phone_verified: number;
    wechat_verified: number;
    weibo_verified: number;
    github_verified: number;
    followee_count: number;
    follower_count: number;
    post_article_count: number;
    digg_article_count: number;
    view_article_count: number;
    subscribe_tag_count: number;
    got_digg_count: number;
    got_view_count: number;
    comment_count: number;
    collect_set_count: number;
    booklet_count: number;
    buy_booklet_count: number;
    post_shortmsg_count: number;
    comment_shortmsg_count: number;
    digg_shortmsg_count: number;
    ltime: number;
    isfollowed: boolean;
    forbidden_words: number;
    create_collect_set_count: number;
    follow_collect_set_count: number;
    weibo_nickname: string;
    wechat_nickname: string;
    github_nickname: string;
    apply_logout: number;
    is_logout: number;
    weibo_id: string;
    is_new: boolean;
    study_point: number;
    university: University;
    major: Major;
    student_status: number;
    select_event_count: number;
    select_online_course_count: number;
    identity: number;
    graduated_at: number;
    blog_move_priority: boolean;
    tech_team: TechTeam;
    job_count: number;
    is_select_annual: boolean;
    select_annual_rank: number;
    annual_list_type: number;
    digg_news_count: number;
    news_privilege: number;
    digg_toutiao_count: number;
    follow_column_cnt: number;
    can_tag_cnt: number;
    need_lead: number;
    follow_topic_count: number;
    badges: Badges;
}

export interface Badges {
    wear_badges: null;
    obtain_badges: null;
    obtain_count: number;
    show_badge: boolean;
    link_url: string;
}

export interface Major {
    major_id: string;
    parent_id: string;
    name: string;
}

export interface TechTeam {
    org_id: string;
    org_name: string;
    org_icon: string;
    role: number;
}

export interface University {
    university_id: string;
    name: string;
    logo: string;
}

export interface GameInfo {
    activity: string;
    gameStatus: number;
    userInfo: GameUserInfo;
    gameInfo: {
        deep: number
        gameId: number | string
    };
}

export interface GameUserInfo {
    uid: string;
    name: string;
    todayDiamond: number;
    todayLimitDiamond: number;
    maxTodayDiamond: number;
    badge: string;
}

export interface StartRsp {
    seed:      number;
    gameId:    string;
    curPos:    CurPos;
    mapData:   number[];
    blockData: BlockData;
}

export interface BlockData {
    moveUp:    number;
    moveDown:  number;
    moveLeft:  number;
    moveRight: number;
    jump:      number;
    loop:      number;
}

export interface CurPos {
    x: number;
    y: number;
}
export interface CommandRsp {
    appendMapData: number[];
    curPos:        CurPos;
    blockData:     BlockData;
    gameDiamond:   number;
}

export interface BlockData {
    moveUp:    number;
    moveDown:  number;
    moveLeft:  number;
    moveRight: number;
    jump:      number;
    loop:      number;
}



export interface OverRsp {
    activity:          string;
    deep:              number;
    gameDiamond:       number;
    originMapData:     number[];
    passLine:          PassLine[];
    realDiamond:       number;
    picoDiamond:       number;
    todayDiamond:      number;
    todayLimitDiamond: number;
}

export interface PassLine {
    x: number;
    y: number;
}
