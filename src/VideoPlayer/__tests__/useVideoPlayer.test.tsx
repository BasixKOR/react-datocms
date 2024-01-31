import { useVideoPlayer } from '../useVideoPlayer';

describe('useVideoPlayer', () => {
  describe('when data object', () => {
    describe('is complete', () => {
      const data = {
        muxPlaybackId: 'ip028MAXF026dU900bKiyNDttjonw7A1dFY',
        title: 'Title',
        width: 1080,
        height: 1920,
        blurUpThumb:
          'data:image/bmp;base64,Qk0eAAAAAAAAABoAAAAMAAAAAQABAAEAGAAAAP8A',
      };

      it('unwraps data into props ready for MUX player', () => {
        const props = { data };

        expect(useVideoPlayer({ props })).toStrictEqual({
          disableCookies: true,
          playbackId: 'ip028MAXF026dU900bKiyNDttjonw7A1dFY',
          title: 'Title',
          style: {
            aspectRatio: '1080 / 1920',
          },
          placeholder:
            'data:image/bmp;base64,Qk0eAAAAAAAAABoAAAAMAAAAAQABAAEAGAAAAP8A',
          rest: {},
        });
      });

      describe('and an explicitly `undefined` style is passed', () => {
        it('avoids adding aspect ratio', () => {
          const props = { data, style: undefined };

          expect(useVideoPlayer({ props })).toStrictEqual({
            disableCookies: true,
            playbackId: 'ip028MAXF026dU900bKiyNDttjonw7A1dFY',
            title: 'Title',
            style: undefined,
            placeholder:
              'data:image/bmp;base64,Qk0eAAAAAAAAABoAAAAMAAAAAQABAAEAGAAAAP8A',
            rest: {},
          });
        });
      });

      describe('and a style object is passed', () => {
        describe("that doesn't include aspect ratio", () => {
          it('adds computed aspect ratio', () => {
            const props = { data, style: { margin: 'auto' } };

            expect(useVideoPlayer({ props })).toStrictEqual({
              disableCookies: true,
              playbackId: 'ip028MAXF026dU900bKiyNDttjonw7A1dFY',
              title: 'Title',
              style: {
                margin: 'auto',
                aspectRatio: '1080 / 1920',
              },
              placeholder:
                'data:image/bmp;base64,Qk0eAAAAAAAAABoAAAAMAAAAAQABAAEAGAAAAP8A',
              rest: {},
            });
          });
        });

        describe('that defines the aspect ratio property', () => {
          describe('as `undefined`', () => {
            it('avoids adding aspect ratio', () => {
              const props = { data, style: { aspectRatio: undefined } };

              expect(useVideoPlayer({ props })).toStrictEqual({
                disableCookies: true,
                playbackId: 'ip028MAXF026dU900bKiyNDttjonw7A1dFY',
                title: 'Title',
                style: {
                  aspectRatio: undefined,
                },
                placeholder:
                  'data:image/bmp;base64,Qk0eAAAAAAAAABoAAAAMAAAAAQABAAEAGAAAAP8A',
                rest: {},
              });
            });
          });

          describe('as a valid CSS value', () => {
            it('uses the passed value to override default aspect ratio', () => {
              const props = { data, style: { aspectRatio: 'auto' } };

              expect(useVideoPlayer({ props })).toStrictEqual({
                disableCookies: true,
                playbackId: 'ip028MAXF026dU900bKiyNDttjonw7A1dFY',
                title: 'Title',
                style: {
                  aspectRatio: 'auto',
                },
                placeholder:
                  'data:image/bmp;base64,Qk0eAAAAAAAAABoAAAAMAAAAAQABAAEAGAAAAP8A',
                rest: {},
              });
            });
          });
        });
      });
    });

    describe('contains `muxPlaybackId`', () => {
      const data = {
        muxPlaybackId: 'ip028MAXF026dU900bKiyNDttjonw7A1dFY',
      };

      it('uses it for `playbackId`', () => {
        const props = { data };

        expect(useVideoPlayer({ props })).toStrictEqual({
          disableCookies: true,
          playbackId: 'ip028MAXF026dU900bKiyNDttjonw7A1dFY',
          rest: {},
          style: {},
          placeholder: undefined,
          title: undefined,
        });
      });
    });

    describe('contains `playbackId`', () => {
      const data = {
        playbackId: 'ip028MAXF026dU900bKiyNDttjonw7A1dFY',
      };

      it('uses it for `playbackId`', () => {
        const props = { data };

        expect(useVideoPlayer({ props })).toStrictEqual({
          disableCookies: true,
          playbackId: 'ip028MAXF026dU900bKiyNDttjonw7A1dFY',
          rest: {},
          style: {},
          placeholder: undefined,
          title: undefined,
        });
      });
    });

    describe('lacks of `width` and `height` values', () => {
      const data = {
        muxPlaybackId: 'ip028MAXF026dU900bKiyNDttjonw7A1dFY',
        title: 'Title',
      };

      it('avoids adding aspect ratio', () => {
        const props = { data };

        expect(useVideoPlayer({ props })).toStrictEqual({
          disableCookies: true,
          playbackId: 'ip028MAXF026dU900bKiyNDttjonw7A1dFY',
          title: 'Title',
          style: {},
          placeholder: undefined,
          rest: {},
        });
      });
    });

    describe('lacks of `title` value', () => {
      const data = {
        muxPlaybackId: 'ip028MAXF026dU900bKiyNDttjonw7A1dFY',
        width: 1080,
        height: 1920,
      };

      it('avoids adding a title', () => {
        const props = { data };

        expect(useVideoPlayer({ props })).toStrictEqual({
          disableCookies: true,
          playbackId: 'ip028MAXF026dU900bKiyNDttjonw7A1dFY',
          title: undefined,
          style: {
            aspectRatio: '1080 / 1920',
          },
          placeholder: undefined,
          rest: {},
        });
      });
    });
  });

  describe('when MUX player props are passed', () => {
    it('collects them into the `rest` value', () => {
      const props = { autoPlay: 'muted', loading: 'page' };

      expect(useVideoPlayer({ props })).toStrictEqual({
        disableCookies: true,
        rest: { autoPlay: 'muted', loading: 'page' },
      });
    });
  });

  describe('when `disableCookies` is passed', () => {
    const data = {
      muxPlaybackId: 'ip028MAXF026dU900bKiyNDttjonw7A1dFY',
    };

    describe('as `undefined`', () => {
      const props = { data, disableCookies: undefined };

      it('sets `disableCookies` to `undefined`', () => {
        expect(useVideoPlayer({ props })).toStrictEqual({
          disableCookies: undefined,
          playbackId: 'ip028MAXF026dU900bKiyNDttjonw7A1dFY',
          style: {},
          placeholder: undefined,
          title: undefined,
          rest: {},
        });
      });
    });

    describe('as `false`', () => {
      const props = { data, disableCookies: false };

      it('sets the prop to `false`', () => {
        expect(useVideoPlayer({ props })).toStrictEqual({
          disableCookies: false,
          playbackId: 'ip028MAXF026dU900bKiyNDttjonw7A1dFY',
          style: {},
          placeholder: undefined,
          title: undefined,
          rest: {},
        });
      });
    });
  });
});
