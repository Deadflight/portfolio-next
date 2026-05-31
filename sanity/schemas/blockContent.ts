/**
 * Block Content schema for Portable Text.
 *
 * Defines the rich text block types available in the Sanity editor:
 * - Standard blocks (h1-h6, normal, blockquote)
 * - Code blocks with language selection
 * - Images with alt text and caption
 * - Link annotations (internal/external)
 */
export const blockContent = {
  name: 'blockContent',
  title: 'Block Content',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'H5', value: 'h5' },
        { title: 'H6', value: 'h6' },
        { title: 'Blockquote', value: 'blockquote' },
      ],
      lists: [{ title: 'Bullet', value: 'bullet' }],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              {
                name: 'href',
                title: 'URL',
                type: 'url',
                validation: (rule: any) =>
                  rule.uri({
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              },
              {
                name: 'openInNewTab',
                title: 'Open in new tab',
                type: 'boolean',
                initialValue: true,
              },
            ],
          },
        ],
      },
    },
    {
      type: 'code',
      title: 'Code Block',
      options: {
        language: 'typescript',
        languageAlternatives: [
          { title: 'TypeScript', value: 'typescript' },
          { title: 'JavaScript', value: 'javascript' },
          { title: 'HTML', value: 'html' },
          { title: 'CSS', value: 'css' },
          { title: 'SCSS', value: 'scss' },
          { title: 'JSON', value: 'json' },
          { title: 'XML', value: 'xml' },
          { title: 'Markdown', value: 'markdown' },
          { title: 'Shell', value: 'shell' },
          { title: 'Bash', value: 'bash' },
          { title: 'Python', value: 'python' },
          { title: 'SQL', value: 'sql' },
          { title: 'YAML', value: 'yaml' },
          { title: 'Plain Text', value: 'text' },
        ],
        withFilename: true,
      },
    },
    {
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Important for SEO and accessibility',
        },
        {
          name: 'caption',
          title: 'Caption',
          type: 'string',
          description: 'Displayed below the image',
        },
      ],
    },
  ],
}
