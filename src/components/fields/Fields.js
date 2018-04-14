/**
 * Fields represents a snapshot of data for an
 * instance of a Card.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { Carousel, Badge, Glyphicon, Label, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Styles from './FieldsStyles';
import InstanceDetailsStyles from '../instance-details/InstanceDetailsStyles';

class Fields extends React.Component {
  static propTypes = {
    /* Facts */
    price: PropTypes.number,
    players: PropTypes.number,
    /* Ratings */
    vindex: PropTypes.number,
    metacritic: PropTypes.number,
    esrb: PropTypes.number,
    /* Items */
    game: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.shape({
      genre_id: PropTypes.number,
      name: PropTypes.string,
    })),
    platforms: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      platform_id: PropTypes.number,
    })),
    /* References */
    games: PropTypes.number,
    developers: PropTypes.number,
    articles: PropTypes.number,
    videos: PropTypes.number,
    tweets: PropTypes.number,
    /* Media */
    steam: PropTypes.string,
    igdb: PropTypes.string,
    twitter: PropTypes.string,
    website: PropTypes.string,
    source: PropTypes.string,
  };

  static defaultProps = {
    /* Facts */
    price: null,
    players: null,
    /* Ratings */
    vindex: null,
    metacritic: null,
    esrb: null,
    /* Items */
    game: null,
    genres: null,
    platforms: null,
    /* References */
    games: null,
    developers: null,
    articles: null,
    videos: null,
    tweets: null,
    /* Media */
    steam: null,
    igdb: null,
    twitter: null,
    website: null,
    source: null,
  };

  /**
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const MediaEnum = Object.freeze(
      {
        "Steam":"/static/images/icons8-steam-filled.svg",
        "IGDB":"/static/images/igdb.jpg",
        "Twitter":"/static/images/icons8-twitter.svg",
        "Website":"/static/images/Globe_icon_4.png",
        "Source":"/static/images/icons8-black-hot-article-50.png"        
      }
    );
    
    const esrb = this.props.esrb ? [this.props.esrb] : null;
    
    let fields = 0;

    /**
     * @description - Conditionally render a row of facts.
     * @param {Number|null} price
     * @param {Number|null} players
     * @return {React.Component|null}
     */
    function showFacts(price, players) {
      if (price != null || players != null) {
        return (
          <div style={[Styles.flexRow]}>
            {showStat(price, true, "usd", "bottom", "USD")}
            {showStat(players, false, "user", "bottom", "Players")}
          </div>
        );
      }
      return null;
    }
    
    /**
     * @description - Conditionally render a formatted stat with an icon and tooltip.
     * @param {Number|null} number - Stat.
     * @param {Boolean} format - If true, format number to usd. Otherwise, format number with commas.
     * @param {String} icon - Glyphicon type.
     * @param {String} position - Tooltip position.
     * @param {String|null} message - Tooltip's message to user.
     * @return {React.Component|null}
     */
    function showStat(number, format, icon, position, message) {
      if (number != null && number >= 0) {
        fields += 1;
        if (format) {
          number /= 100;
        } else {
          number = number.toLocaleString();
        }
        let tooltip = (<div>null</div>);
        if (message != null) {
          tooltip = (
            <Tooltip id={`${message}-tooltip`} key={`${message}-tooltip`}>
              <div style={[Styles.smallText]}>
                {message}
              </div>
            </Tooltip>
          );
        }
        return (
          <OverlayTrigger placement={position} overlay={tooltip}>
            <div style={[Styles.label]}>
              <div style={[Styles.flexRow]}>
                <div style={[Styles.smallText]}>
                  <Glyphicon glyph={icon}>
                    &nbsp;
                    {number}
                  </Glyphicon>
                </div>
              </div>
            </div>
          </OverlayTrigger>
        );
      }
      return null;
    }

    /**
     * @description - Conditionally render a row of ratings.
     * @param {Number|null} vindex
     * @param {Number|null} metacritic
     * @param {Number|null} esrb
     * @return {React.Component|null}
     */
    function showRatings(vindex, metacritic, esrb) {
      if (vindex != null || metacritic != null || esrb != null) {
        return (
          <div style={[Styles.flexRow]}>
            <div style={[Styles.flexColumn]}>
              <div style={[Styles.flexRow]}>
                <div style={[Styles.largeText]}>
                  Ratings
                </div>
              </div>
              <div style={[Styles.flexRow]}>
                {showRating(vindex, "https://upload.wikimedia.org/wikipedia/commons/b/bd/Checkmark_green.svg", "Vindex Scoring")}
                {showRating(metacritic, "https://upload.wikimedia.org/wikipedia/commons/2/20/Metacritic.svg", "Metacritic Scoring")}
                {showEsrb(esrb)}
              </div>
            </div>
          </div>
        );
      }
      return null;
    }

    /**
     * @description - Conditionally render the specified rating for a game.
     * @param {Number|null} number
     * @param {String} title
     * @return {React.Component|null}
     */
    function showRating(number, icon, message) {
      if (number != null && number >= 0) {
        fields += 1;
        const tooltip = (
          <Tooltip id={`${message}-tooltip`} key={`${message}-tooltip`}>
            <div style={[Styles.smallText]}>
              {message}
            </div>
          </Tooltip>
        );
        return (
          <OverlayTrigger placement={"top"} overlay={tooltip}>
            <div style={[Styles.label]}>
              <div style={[Styles.flexRow]}>
                <img src={icon} style={[Styles.iconImage]}/>
                <div style={[Styles.smallText]}>
                  &nbsp;
                  {number}%
                </div>
              </div>
            </div>
          </OverlayTrigger>
        );
      }
      return null;
    }
    
    function showEsrb(esrb) {
      if (esrb != null && esrb >= 1 && esrb <= 7) {
        fields += 1;
        return (
          <div style={[Styles.flexRow]}>
            {
              esrb.map(esrbRating => getEsrb({
                ratingKey: esrbRating,
                key: `esrbRating-${esrbRating}`,                
              }))
            }
          </div>
        );
      }
      return null;      
    }
    
    function getEsrb({ratingKey}) {
      return (
        <img
          style={[Styles.esrbImage]}
          alt={`${InstanceDetailsStyles.esrbMappings[`${ratingKey}alt`]}`}
          src={`${InstanceDetailsStyles.esrbMappings[ratingKey]}`}
          key={`${ratingKey}-esrb`}
        />
      );
    }

    /**
     * @description - Conditionally render a row of items for a game.
     * @param {String} title
     * @param {String} game
     * @param {Number|null} items
     * @return {React.Component|null}
     */
    function showItems(title, game, items) {
      if (items != null && items.length > 0) {
        fields += 1;
        return (
          <div style={[Styles.flexRow]}>
            <div style={[Styles.flexColumn]}>
              <div style={[Styles.flexRow]}>
                <div style={[Styles.largeText]}>
                  {title}
                </div>
              </div>
              <div style={[Styles.flexRow]}>
                <div style={[Styles.carousel]}>
                  <Carousel indicators={false} prevIcon={null} nextIcon={null}>
                    {getItems(game, items)}
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        );
      }
      return null;
    }

    /**
     * @description - Method to wrap items into an array of carousel item objects.
     * @param {String} id
     * @param {Number|null} items
     * @return {Array}
     */
    function getItems(id, items) {
      const subItems = [];
      for (let i = 0; i < items.length; i++) {
        subItems.push(
          <Carousel.Item key={`${id}-${items[i].name}-item-${i}`}>
            <div style={[Styles.item]}>
              {items[i].name}
            </div>
          </Carousel.Item>
        );
      }
      return subItems;
    }

    /**
     * @description - Conditionally render a row of references.
     * @param {Number|null} games
     * @param {Number|null} developers
     * @param {Number|null} articles
     * @param {Number|null} videos
     * @return {React.Component|null}
     */
    function showReferences(games, developers, articles, videos, tweets) {
      if (games != null || developers != null || articles != null || videos != null || tweets != null) {
        return (
          <div style={[Styles.flexRow]}>
            <div style={[Styles.flexColumn]}>
              <div style={[Styles.flexRow]}>
                <div style={[Styles.largeText]}>
                  References
                </div>
              </div>
              <div style={[Styles.flexRow]}>
                {showStat(games, false, "tower", "top", "Games")}
                {showStat(developers, false, "cog", "top", "Developers")}
                {showStat(articles, false, "file", "top", "Articles")}
                {showStat(videos, false, "film", "top", "Videos")}
                {showStat(tweets, false, "pencil", "top", "Tweets")}
              </div>
            </div>
          </div>
        );
      }
      return null;
    }

    /**
     * @description - Conditionally render a row of medias.
     * @param {String|null} steam
     * @param {String|null} igdb
     * @param {String|null} twitter
     * @param {String|null} website
     * @param {String|null} source
     * @return {React.Component|null}
     */
    function showMedias(steam, igdb, twitter, website, source) {
      if (steam != null || igdb != null || twitter != null || website != null || source != null) {
        return (
          <div style={[Styles.flexRow]}>
            <div style={[Styles.flexColumn]}>
              <div style={[Styles.flexRow]}>
                <div style={[Styles.largeText]}>
                  Media
                </div>
              </div>
              <div style={[Styles.flexRow]}>
                {showMedia(steam, "Steam")}
                {showMedia(igdb, "IGDB")}
                {showMedia(twitter, "Twitter")}
                {showMedia(website, "Website")}
                {showMedia(source, "Source")}
              </div>
            </div>
          </div>
        );
      }
      return null;
    }

    /**
     * @description - Conditionally render a media icon with tooltip overlay.
     * @param {String|null} url
     * @param {String} title
     * @return {React.Component|null}
     */
    function showMedia(url, title) {
      if (url != null) {
        const tooltip = (
          <Tooltip id={`${title}-tooltip`} key={`${title}-tooltip`}>
            <div>
              {getFormattedUrl(url)}
            </div>
          </Tooltip>
        );
        let iconUrl = getIconUrl(title);
        fields += 1;
        return (
          <div style={[Styles.icon]}>
            <div style={[Styles.flexColumn]}>
              <OverlayTrigger placement={"top"} overlay={tooltip}>
                <img src={iconUrl} style={[Styles.iconImage]}/>
              </OverlayTrigger>
            </div>
          </div>
        );
      }
      return null;
    }
    
    /**
     * @description - Given a title (key), get the url (value) associated.
     * @param {String} title
     * @return {String}
     */
    function getIconUrl(title) {
      let iconUrl = "";
      if (MediaEnum.hasOwnProperty(title)) {
        iconUrl = MediaEnum[title];
      }
      return iconUrl;      
    }
    
    /**
     * @description - Format the url into chunks of stylized 
     * strings, so that it fits into the tooltip.
     * @param {String} url
     * @return {Array}
     */
    function getFormattedUrl(url) {
      const formattedUrl = [];
      let chunkifiedUrl = chunkifyUrl(url, 24);
      for (let chunk in chunkifiedUrl) {
        formattedUrl.push(
          <div style={[Styles.urlText]} key={`${Math.random()}-${url}-url`}>
            {chunkifiedUrl[chunk]}
          </div>
        );
      }
      return formattedUrl;      
    }
    
    /**
     * @description - Break up the url (str) into length sized chunks.
     * @param {String} str
     * @param {Number} length
     * @return {Array}
     */
    function chunkifyUrl(str, length) {
      return str.match(new RegExp('.{1,' + length + '}', 'g'));
    }

    /**
     * @description - Conditionally render the message:
     * "No Fields Available." to tell the user that the
     * Card contains no valuable information to search,
     * sort, or filter upon.
     * @param {Number} number
     * @return {React.Component|null}
     */
    function showNone(number) {
      if (fields <= 0) {
        return (
          <div style={[Styles.flexRow]}>
            <div style={[Styles.smallText]}>
              No Fields Available.
            </div>
          </div>
        );
      }
      return null;
    }

    return (
      <div style={[Styles.flexColumn]}>
        {showFacts(this.props.price, this.props.players)}
        {showRatings(this.props.vindex, this.props.metacritic, esrb)}
        {showItems("Genres", this.props.game, this.props.genres)}
        {showItems("Platforms", this.props.game, this.props.platforms)}

        {showReferences(this.props.games, this.props.developers, this.props.articles, this.props.videos, this.props.tweets)}
        {showMedias(this.props.steam, this.props.igdb, this.props.twitter, this.props.website, this.props.source)}
        {showNone(fields)}
      </div>
    );
  }
}

export default Radium(Fields);
