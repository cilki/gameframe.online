/**
 * Article is a generic page template for Articles.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Radium, { StyleRoot } from 'radium';
import ReactHTMLParser from 'react-html-parser';
import { Helmet } from 'react-helmet';
import InstanceDetails from '../instance-details/InstanceDetails';
import InstanceDetailsStyles from '../instance-details/InstanceDetailsStyles';
import Minigrid from '../minigrid/Minigrid';
import Minicard from '../minicard/Minicard';

/**
 * @description - Helper method for rendering a link to a game, developer, or article.
 * @param {Object} props
 * @param {String} props.label
 * @param {String} props.url
 * @returns {React.Component}
 */
function link({
  label, url, cover, key,
}) {
  return (
    <Minicard label={label} url={url} cover={cover} cardKey={`${key}-inner`} key={key} />
  );
}

link.propTypes = {
  label: PropTypes.object.isRequired, //eslint-disable-line
  url: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  key: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
};

/**
 * @description - Returns the main component to render a article's own
 * page.
 * @param {Object} props
 * @returns {React.Component}
 */
class Article extends React.Component {
  static propTypes = {
    article_link: PropTypes.string.isRequired, //eslint-disable-line
    author: PropTypes.string,
    developers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })),
    games: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })),
    cover: PropTypes.string,
    introduction: PropTypes.string,
    outlet: PropTypes.string,
    timestamp: PropTypes.string,
    title: PropTypes.string,
    fetchArticle: PropTypes.func.isRequired,
  };

  static defaultProps = {
    article_link: '',
    author: '',
    developers: [],
    games: [],
    cover: null,
    introduction: '',
    outlet: '',
    timestamp: '',
    title: '',
  };

  /**
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchArticle();
  }

  render() {
    const coverURL = this.props.cover && this.props.cover.indexOf('http') < 0 ?
      `https://${this.props.cover}` : this.props.cover;
    const outletURL = this.props.outlet && this.props.outlet.indexOf('http') < 0 ?
      `http://${this.props.outlet}` : this.props.outlet;
    const articleURL = this.props.article_link && this.props.article_link.indexOf('http') < 0 ?
      `http://${this.props.article_link}` : this.props.article_link;
    const published = this.props.timestamp ?
      (new Date(this.props.timestamp)).toLocaleString() : null;
    return (
      <StyleRoot>
        <Helmet>
          <title>{`${this.props.title} - GameFrame.online`}</title>
        </Helmet>
        <InstanceDetails imageURL={coverURL}>
          <div style={[InstanceDetailsStyles.articlePrimaryDataCluster]}>
            <div style={[InstanceDetailsStyles.articleCover]}>
              <div style={[InstanceDetailsStyles.articleCoverImageBoundingBox]}>
                <a href={coverURL}>
                  <img
                    style={[InstanceDetailsStyles.articleCoverImage]}
                    src={coverURL}
                    alt={`${this.props.title} cover`}
                  />
                </a>
              </div>
            </div>
            <div style={[InstanceDetailsStyles.articlePrimaryInfoCluster]}>
              <div style={[InstanceDetailsStyles.titleText]}>
                {this.props.title}
              </div>
              <div style={[InstanceDetailsStyles.authorIndicator]}>
                {this.props.author ? `Written by ${this.props.author}` : 'Unknown author.'}
              </div>
              <div style={[InstanceDetailsStyles.publishDateIndicator]}>
                {this.props.timestamp ? `Published ${published}` : 'Unknown publication date.'}
              </div>
            </div>
          </div>
          <hr style={[InstanceDetailsStyles.horizontalRule]} />
          <div>
            <div style={[InstanceDetailsStyles.synoposisIndicator]}>
              Introduction:
            </div>
            <div style={[InstanceDetailsStyles.synoposisHTMLContainer]}>
              {ReactHTMLParser(this.props.introduction)}
            </div>
          </div>
          <hr style={[InstanceDetailsStyles.horizontalRule]} />
          <div style={[InstanceDetailsStyles.bigButtonCluster]}>
            <a href={articleURL} style={[InstanceDetailsStyles.bigButton]} key="articleURL">
              Original Article
            </a>
            <a href={outletURL} style={[InstanceDetailsStyles.bigButton]} key="outletURL">
              Outlet Website
            </a>
          </div>
          <div style={[InstanceDetailsStyles.externalGridCluster]}>
            <div style={[InstanceDetailsStyles.developerGridCluster('30%')]}>
              <div style={[InstanceDetailsStyles.developerIndicator]}>
                Developers:
              </div>
              <Minigrid>
                {
                  this.props.developers.map(developer => link({
                    label: developer.name,
                    url: `/developers/${developer.id}`,
                    cover: (developer.logo && developer.logo.indexOf('http') < 0 ? `https://${developer.logo}` : developer.logo),
                    key: `developer-${developer.id}`,
                  }))
                }
              </Minigrid>
            </div>
            <div style={[InstanceDetailsStyles.gameGridCluster('60%')]}>
              <div style={[InstanceDetailsStyles.gameIndicator]}>
                Games:
              </div>
              <Minigrid>
                {
                  this.props.games.map(game => link({
                    label: game.name,
                    url: `/games/${game.id}`,
                    cover: (game.cover && game.cover.indexOf('http') < 0 ? `https://${game.cover}` : game.cover),
                    key: `game-${game.id}`,
                  }))
                }
              </Minigrid>
            </div>
          </div>
        </InstanceDetails>
      </StyleRoot>
    );
  }
}

export default Radium(Article);
