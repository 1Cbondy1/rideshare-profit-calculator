import React from 'react';

export default class AdComponent extends React.Component {
  componentDidMount () {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

render () {
    return (
        <ins className="adsbygoogle"
            style={{display:"block"}}
            data-ad-client="ca-pub-4688166736094996"
            data-ad-slot="1062596502"
            data-ad-format="auto"
            data-full-width-responsive="true" 
        />
    );
  }
}