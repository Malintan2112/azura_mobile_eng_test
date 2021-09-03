import React, { Component } from 'react';

import ImageFixed from './ImageFixed';

export default class ErrorableImage extends Component {
  static propTypes = {
    ...ImageFixed.propTypes,
    fallbackSource: ImageFixed.propTypes.source
  };

  state = { error: false };

  render() {
    const { source, fallbackSource, onError, ...restProps } = this.props;

    const shouldUseFallbackSource = this.state.error && fallbackSource;
    return (
      <ImageFixed
        source={shouldUseFallbackSource ? fallbackSource : source}
        onError={(error) => {
          // if an error hasn't already been seen, try to load the error image
          // instead
          if (!this.state.error) {
            this.setState({ error: true });
          }

          // also propagate to error handler if it is specified
          if (onError) {
            onError(error);
          }
        }}
        {...restProps}
      />
    );
  }
}