/**
 * Fields represents a snapshot of data for an
 * instance of a Card.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { Carousel, Badge, Label, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Styles from './FieldsStyles';

class Fields extends React.Component {
  static propTypes = {
    price: PropTypes.number,

    vindex: PropTypes.number,
    metacritic: PropTypes.number,

    genres: PropTypes.arrayOf(PropTypes.shape({
      genre_id: PropTypes.number,
      name: PropTypes.string,
    })),
    platforms: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      platform_id: PropTypes.number,
    })),

    games: PropTypes.number,
    developers: PropTypes.number,
    articles: PropTypes.number,
    videos: PropTypes.number,

    steam: PropTypes.string,
    igdb: PropTypes.string,
    twitter: PropTypes.string,
    website: PropTypes.string,
    source: PropTypes.string
  };

  static defaultProps = {
    price: null,

    vindex: null,
    metacritic: null,

    genres: [],
    platforms: [],

    games: null,
    developers: null,
    articles: null,
    videos: null,

    steam: null,
    igdb: null,
    twitter: null,
    website: null,
    source: null
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
    
    let fields = 0;

    /**
     * @description - Conditionally render a row of facts.
     * @param {number|null} price
     * @return {React.Component|null}
     */
    function showFacts(price) {
      if (price != null) {
        return (
          <div style={[Styles.flexRow]}>
            {showPrice(price)}
          </div>
        );
      }
      return null;
    }

    /**
     * @description - Conditionally render the price of a game.
     * @param {number|null} price
     * @return {React.Component|null}
     */
    function showPrice(price) {
      if (price != null && price >= 0) {
        fields += 1;
        price /= 100;
        return (
          <div style={[Styles.label]}>
            <div style={[Styles.flexRow]}>
              <div style={[Styles.smallText]}>
                ${price}
              </div>
            </div>
          </div>
        );
      }
      return null;
    }

    /**
     * @description - Conditionally render a row of ratings.
     * @param {number|null} vindex
     * @param {number|null} metacritic
     * @return {React.Component|null}
     */
    function showRatings(vindex, metacritic) {
      if (vindex != null || metacritic != null) {
        return (
          <div style={[Styles.flexRow]}>
            <div style={[Styles.flexColumn]}>
              <div style={[Styles.flexRow]}>
                <div style={[Styles.largeText]}>
                  Ratings
                </div>
              </div>
              <div style={[Styles.flexRow]}>
                {showRating(vindex, 'Vindex')}
                {showRating(metacritic, 'Metacritic')}
              </div>
            </div>
          </div>
        );
      }
      return null;
    }

    /**
     * @description - Conditionally render the specified rating for a game.
     * @param {number|null} number
     * @param {string} title
     * @return {React.Component|null}
     */
    function showRating(number, title) {
      if (number != null && number >= 0) {
        fields += 1;
        return (
          <div style={[Styles.label]}>
            <div style={[Styles.flexColumn]}>
              <div style={[Styles.smallText]}>
                {number}%
              </div>
              <div style={[Styles.smallText]}>
                {title}
              </div>
            </div>
          </div>
        );
      }
      return null;
    }

    /**
     * @description - Conditionally render a row of items for a game.
     * @param {string} title
     * @param {number|null} items
     * @return {React.Component|null}
     */
    function showItems(title, items) {
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
                    {getItems(items)}
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
     * @param {number|null} items
     * @return {number|null}
     */
    function getItems(items) {
      const subItems = [];
      for (let i = 0; i < items.length; i++) {
        subItems.push(
          <Carousel.Item key={`item-${items[i].name}`}>
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
     * @param {number|null} games
     * @param {number|null} developers
     * @param {number|null} articles
     * @param {number|null} videos
     * @return {React.Component|null}
     */
    function showReferences(games, developers, articles, videos) {
      if (games != null || developers != null || articles != null || videos != null) {
        return (
          <div style={[Styles.flexRow]}>
            <div style={[Styles.flexColumn]}>
              <div style={[Styles.flexRow]}>
                <div style={[Styles.largeText]}>
                  References
                </div>
              </div>
              <div style={[Styles.flexRow]}>
                {showReference(games, 'Games')}
                {showReference(developers, 'Developers')}
                {showReference(articles, 'Articles')}
                {showReference(videos, 'Videos')}
              </div>
            </div>
          </div>
        );
      }
      return null;
    }

    /**
     * @description - Conditionally render a reference.
     * @param {number|null} number
     * @param {string} title
     * @return {React.Component|null}
     */
    function showReference(number, title) {
      if (number != null && number >= 0) {
        fields += 1;
        return (
          <div style={[Styles.label]}>
            <div style={[Styles.flexColumn]}>
              <div style={[Styles.smallText]}>
                {number}
              </div>
              <div style={[Styles.smallText]}>
                {title}
              </div>
            </div>
          </div>
        );
      }
      return null;
    }

    /**
     * @description - Conditionally render a row of medias.
     * @param {string|null} steam
     * @param {string|null} igdb
     * @param {string|null} twitter
     * @param {string|null} website
     * @param {string|null} source
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
     * @param {string|null} url
     * @param {string} title
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
     * @param {string} title
     * @return {string}
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
     * @param {string} url
     * @return {array}
     */
    function getFormattedUrl(url) {
      const formattedUrl = [];
      let chunkifiedUrl = chunkifyUrl(url, 24);
      for (let chunk in chunkifiedUrl) {
        formattedUrl.push(
          <div style={[Styles.urlText]}>
            {chunkifiedUrl[chunk]}
          </div>
        );
      }
      return formattedUrl;      
    }
    
    /**
     * @description - Break up the url (str) into length sized chunks.
     * @param {string} str
     * @param {number} length
     * @return {array}
     */
    function chunkifyUrl(str, length) {
      return str.match(new RegExp('.{1,' + length + '}', 'g'));
    }

    /**
     * @description - Conditionally render the message:
     * "No Fields Available." to tell the user that the
     * Card contains no valuable information to search,
     * sort, or filter upon.
     * @param {number} number
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
        {showFacts(this.props.price)}
        {showRatings(this.props.vindex, this.props.metacritic)}
        {showItems('Genres', this.props.genres)}
        {showItems('Platforms', this.props.platforms)}

        {showReferences(this.props.games, this.props.developers, this.props.articles, this.props.videos)}
        {showMedias(this.props.steam, this.props.igdb, this.props.twitter, this.props.website, this.props.source)}
        {showNone(fields)}
      </div>
    );
  }
}

export default Radium(Fields);
